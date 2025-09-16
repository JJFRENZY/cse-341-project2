import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'contactsdb';

const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

try {
  await client.connect();
  const count = await client.db(dbName).collection('contacts').countDocuments();
  console.log(`contacts count = ${count}`);
} finally {
  await client.close();
}
