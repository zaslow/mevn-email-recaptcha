const mongodb = require('mongodb').MongoClient;

const client = mongodb;

const dbName = process.env.DB_NAME;
const dbUri = process.env.DB_URI;

module.exports = (req, res) => {
  client.connect(`${dbUri}/${dbName}`, (err, conn) => {
    if (err) res.status(500).send(err);

    conn.db(dbName).collection('quotes').findOne({}, (e, result) => {
      if (e) res.status(500).send(e);

      console.log(`Found 1 quote by ${result.author}.`)
      res.json(result);

      db.close();
    });
  });
};
