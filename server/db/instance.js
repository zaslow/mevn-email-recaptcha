const mongodb = require('mongodb');

const client = mongodb.MongoClient;

const dbName = process.env.DB_NAME;
const dbUri = process.env.DB_URI;

module.exports = async () => {
  const conn = await client.connect(`${dbUri}/${dbName}`)
    .catch(err => {
      console.log(err);
      return err;
    });

  return {
    conn,
    db: conn.db(dbName)
  };
};
