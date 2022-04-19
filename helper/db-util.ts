require("dotenv").config({ path: "./.env" });
const { MongoClient } = require("mongodb");

const { mongodbUsername, mongodbPass } = process.env;

export async function connectDatabase() {
  return await MongoClient.connect(
    `mongodb+srv://${mongodbUsername}:${mongodbPass}@cluster0.hbkdn.mongodb.net/sorte-fikant?retryWrites=true&w=majority`
  );
}

export async function insertDocument(
  client: any,
  collection: any,
  document: any
) {
  const db = await client.db();
  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function updateDocument(
  client: any,
  collection: any,
  filter?: any,
  document?: any
) {
  try {
    const db = await client.db();
    return await db.collection(collection).updateOne(filter, document);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllDocuments(
  client: any,
  collection: any,
  filter?: any
  // sort: any,
) {
  const db = await client.db();

  const documents = await db.collection(collection).find().toArray();

  // .find(filter);
  // .sort(sort)
  // .toArray();

  return documents;
}
