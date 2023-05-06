// Import the MongoClient module and assign it to the 'MongoClient' variable
import { MongoClient } from 'mongodb';

// Declare a global variable called 'db'
let db;

/* Declare an asynchronous function called 'connectToDb' that takes a callback function as input. Inside the function, create a new MongoClient object and connect to a MongoDB database using the URL specified in the environment variables. After connecting to the database, set the global 'db' variable to the database object and invoke the callback function. */
async function connectToDb(cb) {
  const client = new MongoClient(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.adxcm2e.mongodb.net/?retryWrites=true&w=majority`
  );
  await client.connect();

  db = client.db('dmu-db');
  cb();
}

// Export the 'db' and 'connectToDb' variables for use in other modules
export { db, connectToDb };
