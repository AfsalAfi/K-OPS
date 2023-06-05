const { MongoClient, ServerApiVersion } = require("mongodb");
const { DB } = require('./db-config')
const uri = DB

let cachedClient = null;
let cachedDb = null;

async function connect() {
    try {
      const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
  
      await client.connect();
      console.log('Connected to MongoDB');
      cachedClient = client;
      cachedDb = client.db('K-OPS');
    } catch (error) {
      console.error(error);
    }
  }
  
  async function getCollection(collectionName) {
    if (!cachedClient || !cachedDb) {
      await connect();
    }
  
    return cachedDb.collection(collectionName);
  }
  
  module.exports = { connect, getCollection };
  































// let cachedClient = null;
// let cachedDb = null;

// const client = new MongoClient(uri,  {
//         serverApi: {
//             version: ServerApiVersion.v1,
//             strict: true,
//             deprecationErrors: true,
//         }
//     }
// );
// async function run() {
//   try {
//     await client.connect();
//     console.log("connected to database");
//     cachedClient = client;
//     cachedDb = client.db('GatePass');
//   } finally {
//     await client.close();
//   }
// }

//     // const database = client.db("GatePass")
//     // const collection = database.collection("qwerty")
//     // const result = await collection.find().toArray();
//     // console.log(result);

// function getCollection() {
//     const database = client.db('GatePass');
//     return database.collection("qwerty");
//   }

// module.exports = { run, getCollection };
