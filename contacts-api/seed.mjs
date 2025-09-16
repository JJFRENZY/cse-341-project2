import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';
import fs from 'node:fs';

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'contactsdb';
const data = JSON.parse(fs.readFileSync('./data/contacts.json','utf-8'));

const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

try {
  await client.connect();
  const col = client.db(dbName).collection('contacts');
  const { insertedCount } = await col.insertMany(data);
  console.log(`Inserted ${insertedCount} contacts`);
} finally {
  await client.close();
}
