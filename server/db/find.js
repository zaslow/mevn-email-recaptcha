const mongodb = require('mongodb');

const client = mongodb.MongoClient;

const dbName = process.env.DB_NAME;
const dbUri = process.env.DB_URI;

module.exports = async () => {
  const conn = await client.connect(`${dbUri}/${dbName}`).catch(err => {
    console.log(err);
    return err;
  });

  const res = await conn.db(dbName).collection('quotes')
    .find()
    .limit(1)
    .sort({ $natural: -1 })
    .toArray();
  console.log(`Found 1 quote by ${res[0].author || 'anonymous'}.`);
  conn.close();

  return res[0];
};
