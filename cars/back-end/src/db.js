//imporing MongoClient
import { MongoClient } from 'mongodb';

//making the varible
let db;

/* creating async function that runs code that creates a new MongoClient object, which is used to connect to a MongoDB database. The argument 'mongodb://127.0.0.1:27017' is the URL of the MongoDB server, which in this case is running on the local machine (127.0.0.1) on port 27017. and then connecting to that client & and getting result from the actual database in the mongodb */
async function connectToDb(cb) {
  const client = new MongoClient(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.adxcm2e.mongodb.net/?retryWrites=true&w=majority`
  );
  await client.connect();

  db = client.db('dmu-db');
  cb();
}

//exporting the db & connectToDb
export { db, connectToDb };
