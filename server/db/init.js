const mongodb = require('mongodb');

const client = mongodb.MongoClient;

const dbName = process.env.DB_NAME;
const dbUri = process.env.DB_URI;

module.exports = async () => {
  const conn = await client.connect(`${dbUri}/${dbName}`).catch(err => {
    console.log(err);
    return err;
  });

  try {
    await conn.db(dbName).createCollection('quotes');
    console.log('Collection \'quotes\' created.')
  } catch(e) {
    console.log(e);
  } finally {
    conn.close();
  }
}
