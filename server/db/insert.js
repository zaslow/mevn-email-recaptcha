const client = require('mongodb').MongoClient;

const dbName = process.env.DB_NAME;
const dbUri = process.env.DB_URI;

module.exports = async msg => {
  const conn = await client.connect(`${dbUri}/${dbName}`).catch(err => {
    console.log(err);
    return err;
  });

  let quote = {
    ...msg,
    added: new Date(),
    lastSelected: null
  };

  const res = await conn.db(dbName).collection('quotes').insertOne(quote);
  console.log(`Inserted quote ${quote._id} by ${quote.name || 'Anonymous'}.`);
  conn.close();

  return quote;
};
