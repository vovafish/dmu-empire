// Importing express module
import express from 'express';

// Importing db and connectToDb from ./db.js file
import { db, connectToDb } from './db.js';

// Importing fileURLToPath function from url module
import { fileURLToPath } from 'url';

// Importing path module
import path from 'path';

// Importing dotenv configuration
import 'dotenv/config';

// Importing jwt module
import jwt from 'jsonwebtoken';

// Importing bcrypt module
import bcrypt from 'bcrypt';

// Importing sendEmail function from ./util/sendEmail.js file
import { sendEmail } from './util/sendEmail.js';

// Importing bodyParser module
import bodyParser from 'body-parser';

// Importing cors module
import cors from 'cors';

// Importing uuid module
import { v4 as uuid } from 'uuid';

// Importing ObjectID module from mongodb
import { ObjectID } from 'mongodb';

// Converting file URL to path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initializing express app
const app = express();

// Enabling Express to parse incoming request bodies that are in the JSON format
app.use(express.json());

// Serving the static files
app.use(express.static(path.join(__dirname, '../build')));

// Handling all the routes that don't start with api
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// Handling a GET request for a car by name
app.get('/api/cars/:name', async (req, res) => {
  const { name } = req.params;
  const car = await db.collection('cars').findOne({ name });
  if (car) {
    res.json(car);
  } else {
    res.sendStatus(404);
  }
});

// Handling a DELETE request for a car by name
app.delete('/api/cars/:name', async (req, res) => {
  const { name } = req.params;
  const car = await db.collection('cars').deleteOne({ name });
  if (car) {
    res.json(car);
  } else {
    res.sendStatus(404);
  }
});

// Handling a GET request for all cars
app.get('/api/cars', async (req, res) => {
  const cars = await db.collection('cars').find({}).toArray();
  if (cars) {
    res.json(cars);
  } else {
    res.sendStatus(404);
  }
});

// Handling a POST request to add a new car
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
  //endpoint for user sign up
  const { email, password, first_name, last_name, phone_number } = req.body; //extract user data from request body
  const user = await db.collection('users').findOne({ email }); //check if user already exists in database with the same email

  if (user) {
    //if user already exists, return status code 409 (conflict)
    res.sendStatus(409);
  }

  //hash password with 10 iterations
  const passwordHash = await bcrypt.hash(password, 10); //hash the user's password for security purposes

  const verificationString = uuid(); //generate a unique verification string using the uuid package

  //insert user data into the database
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

  const { insertedId } = result; //get the inserted user's ID from the result object

  try {
    //send verification email to the user using the sendEmail function
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
    //if there's an error sending the email, log the error and return status code 500 (internal server error)
    console.log(e);
    res.sendStatus(500);
  }

  //create a JWT token for the user using their data and a secret key
  jwt.sign(
    {
      id: insertedId,
      email,
      first_name,
      last_name,
      phone_number,
      isAdmin: false,
    },
    process.env.JWT_SECRET, //use the JWT_SECRET environment variable as the secret key
    {
      expiresIn: '2d', //set the token to expire in 2 days
    },
    (err, token) => {
      if (err) {
        return res.status(500).send(err); //if there's an error creating the token, return status code 500 (internal server error) and the error message
      }
      res.status(200).json({ token }); //send the JWT token to the client as a JSON object
    }
  );
});

// This route handles user login
app.post('/api/login', async (req, res) => {
  // Get email and password from request body
  const { email, password } = req.body;

  // Find user with matching email in the database
  const user = await db.collection('users').findOne({ email });

  // If user does not exist, send 401 unauthorized status
  if (!user) res.sendStatus(401);

  // Extract user properties from database object
  const {
    _id: id,
    first_name,
    last_name,
    phone_number,
    isVerified,
    isAdmin,
    passwordHash,
  } = user;

  // Compare password with password hash stored in the database
  const isCorrect = await bcrypt.compare(password, passwordHash);

  // If password is correct, generate JWT token and send it in response
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
    // If password is incorrect, send 401 unauthorized status
    res.sendStatus(401);
  }
});

// This route handles email verification
app.put('/api/verify-email', async (req, res) => {
  // Get verification string from request body
  const { verificationString } = req.body;

  // Find user with matching verification string in the database
  const result = await db.collection('users').findOne({
    verificationString,
  });

  // If user does not exist, send 401 unauthorized status
  if (!result)
    return res
      .status(401)
      .json({ message: 'The email verification code is not correct!' });

  // Extract user properties from database object
  const { _id: id, email } = result;

  // Update user's isVerified status in the database
  await db
    .collection('users')
    .updateOne({ _id: ObjectID(id) }, { $set: { isVerified: true } });

  // Generate JWT token and send it in response
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

// Set up the route for password reset - this is a PUT request that expects an email parameter in the URL
app.put('/api/forgot-password/:email', async (req, res) => {
  const { email } = req.params;

  // Generate a unique password reset code using the uuid library
  const passwordResetCode = uuid();

  // Update the user's document in the database to include the new password reset code
  const result = await db
    .collection('users')
    .updateOne({ email }, { $set: { passwordResetCode } });

  // If the update was successful, send an email to the user with a link to reset their password
  if (result.modifiedCount > 0) {
    try {
      await sendEmail({
        to: email,
        from: 'vladimirrybakov123@gmail.com',
        subject: 'Password Reset',
        text: `To reset your password, click this link:
        http://localhost:3000/reset-password/${passwordResetCode}
        `,
        // Uncomment the line below to use the production reset password URL
        // https://car-empire-380115.nw.r.appspot.com/reset-password/${passwordResetCode}
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  // Return a success response
  res.sendStatus(200);
});

// Set up the route for resetting the password - this is a PUT request that expects a passwordResetCode parameter in the URL
app.put('/api/users/:passwordResetCode/reset-password', async (req, res) => {
  const { passwordResetCode } = req.params;
  const { newPassword } = req.body;

  // Hash the new password using the bcrypt library
  const newPasswordHash = await bcrypt.hash(newPassword, 10);

  // Update the user's document in the database to include the new password hash and remove the password reset code
  const result = await db.collection('users').findOneAndUpdate(
    { passwordResetCode },
    {
      $set: { passwordHash: newPasswordHash },
      $unset: { passwordResetCode: '' },
    }
  );

  // If no document was modified, return a 404 error
  if (result.lastErrorObject.n === 0) return res.sendStatus(404);

  // Return a success response
  res.sendStatus(200);
});

// Set up the server to listen on the specified port
const PORT = process.env.PORT || 8000;

/* If connection is successful to the database then output a related message and say what port the server is running on */
connectToDb(() => {
  console.log('Successfully connected to database!');
  app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
  });
});
