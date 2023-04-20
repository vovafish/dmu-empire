/*
Importing the express framework to simplify work with the back-end
&
database conncetion
*/
import express from 'express';
import { db, connectToDb } from './db.js';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { sendEmail } from './util/sendEmail.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import { v4 as uuid } from 'uuid';
import { ObjectID } from 'mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//initializing the express var
const app = express();
/* This code is used to enable Express to parse incoming request bodies that are in the JSON format. It is used to access the data sent by the client in a POST request. */
app.use(express.json());
/* app.use(bodyParser.json());
app.use(cors()); */
app.use(express.static(path.join(__dirname, '../build')));

//handles all the routes that dont start with api
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/* This code is a route handler for an API endpoint that retrieves a car from a database. It uses the Express framework to handle the request. The code takes the name of the car from the URL parameters, then it queries the database for a car with that name. If it finds one, it sends back the car's data as a JSON response. If no car is found, it sends back an HTTP status code of 404 (Not Found). */
app.get('/api/cars/:name', async (req, res) => {
  const { name } = req.params;

  const car = await db.collection('cars').findOne({ name });

  if (car) {
    res.json(car);
  } else {
    res.sendStatus(404);
  }
});

app.delete('/api/cars/:name', async (req, res) => {
  const { name } = req.params;

  const car = await db.collection('cars').deleteOne({ name });

  if (car) {
    res.json(car);
  } else {
    res.sendStatus(404);
  }
});

/* 
This code is an Express.js route handler that retrieves all cars from a database. It uses the MongoDB find() method to query the 'cars' collection and convert the result to an array. The cars are then logged to the console and sent as a JSON response if they exist, or a 404 status code if not.
 */
app.get('/api/cars', async (req, res) => {
  const cars = await db.collection('cars').find({}).toArray();
  console.log(cars);
  if (cars) {
    res.json(cars);
  } else {
    res.sendStatus(404);
  }
});

/* app.get('/api/cars', async (req, res) => {
  const admin = await db.collection('users').find({ isAdmin: true });
}); */

app.post('/api/cars', async (req, res) => {
  const {
    name,
    title,
    year,
    origin,
    weight,
    mileage,
    gearbox,
    fuel_type,
    colour,
    body_type,
    engine_size,
    doors,
    seats,
    acceleration,
    fuel_consumption,
    description,
    price,
    image,
  } = req.body;

  const result = await db.collection('cars').insertOne({
    name,
    title,
    year,
    origin,
    weight,
    mileage,
    gearbox,
    fuel_type,
    colour,
    body_type,
    engine_size,
    doors,
    seats,
    acceleration,
    fuel_consumption,
    description,
    price,
    image,
  });
});

app.post('/api/signup', async (req, res) => {
  const { email, password, first_name, last_name, phone_number } = req.body;
  const user = await db.collection('users').findOne({ email });

  if (user) {
    res.sendStatus(409);
  }

  //hash password with 10 iterations
  const passwordHash = await bcrypt.hash(password, 10);

  const verificationString = uuid();

  const result = await db.collection('users').insertOne({
    email,
    first_name,
    last_name,
    phone_number,
    passwordHash,
    isVerified: false,
    isAdmin: false,
    verificationString,
  });

  const { insertedId } = result;

  try {
    await sendEmail({
      to: email,
      from: 'vladimirrybakov123@gmail.com',
      subject: 'Please verify your email',
      text: `
        Thanks for signing up! To verify your email, click here: 
        http://localhost:3000/verify-email/${verificationString}
      `,
      //http://localhost:3000/verify-email/${verificationString}
      //https://car-empire-380115.nw.r.appspot.com/verify-email/${verificationString}
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

  jwt.sign(
    {
      id: insertedId,
      email,
      first_name,
      last_name,
      phone_number,
      isAdmin: false,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '2d',
    },
    (err, token) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).json({ token });
    }
  );
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await db.collection('users').findOne({ email });

  if (!user) res.sendStatus(401);

  const {
    _id: id,
    first_name,
    last_name,
    phone_number,
    isVerified,
    isAdmin,
    passwordHash,
  } = user;

  const isCorrect = await bcrypt.compare(password, passwordHash);

  if (isCorrect) {
    jwt.sign(
      { id, first_name, last_name, phone_number, isVerified, email, isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: '2d',
      },
      (err, token) => {
        if (err) {
          res.status(500).json(err);
        }

        res.status(200).json({ token });
      }
    );
  } else {
    res.sendStatus(401);
  }
});

app.put('/api/verify-email', async (req, res) => {
  const { verificationString } = req.body;
  const result = await db.collection('users').findOne({
    verificationString,
  });

  if (!result)
    return res
      .status(401)
      .json({ message: 'The email verification code is not correct!' });

  const { _id: id, email } = result;

  await db
    .collection('users')
    .updateOne({ _id: ObjectID(id) }, { $set: { isVerified: true } });

  jwt.sign(
    { id, email, isVerified: true },
    process.env.JWT_SECRET,
    {
      expiresIn: '2d',
    },
    (err, token) => {
      if (err) return res.sendStatus(500);
      res.status(200).json({ token });
    }
  );
});

app.put('/api/forgot-password/:email', async (req, res) => {
  const { email } = req.params;
  const passwordResetCode = uuid();
  const result = await db
    .collection('users')
    .updateOne({ email }, { $set: { passwordResetCode } });

  if (result.modifiedCount > 0) {
    try {
      await sendEmail({
        to: email,
        from: 'vladimirrybakov123@gmail.com',
        subject: 'Password Reset',
        text: `To reset your password, click this link:
        http://localhost:3000/reset-password/${passwordResetCode}
        `,
        //http://localhost:3000/reset-password/${passwordResetCode}
        //https://car-empire-380115.nw.r.appspot.com/reset-password/${passwordResetCode}
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  res.sendStatus(200);
});

app.put('/api/users/:passwordResetCode/reset-password', async (req, res) => {
  const { passwordResetCode } = req.params;
  const { newPassword } = req.body;

  const newPasswordHash = await bcrypt.hash(newPassword, 10);

  const result = await db.collection('users').findOneAndUpdate(
    { passwordResetCode },
    {
      $set: { passwordHash: newPasswordHash },
      $unset: { passwordResetCode: '' },
    }
  );

  console.log(result);
  if (result.lastErrorObject.n === 0) return res.sendStatus(404);

  res.sendStatus(200);
});

const PORT = process.env.PORT || 8000;

/* If connection if successful to the database then output releated message and say what port running on */
connectToDb(() => {
  console.log('Successfully connected to database!');
  app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
  });
});
