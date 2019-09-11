import mongodb from 'mongodb';
import config from 'config';

const MongoClient = mongodb.MongoClient;
let _db: mongodb.Db;

async function initDb(): Promise<void> {
  try {
    const client = await MongoClient.connect(config.get('mongodb.connectionString'), { useNewUrlParser: true });
    _db = client.db();

    console.log('Database initialized...');
  } catch (err) {
    throw new Error(err.message);
  }
}

function getDb(): mongodb.Db {
  if (_db) {
    return _db;
  }
  throw 'No database found';
}

export { initDb, getDb };
