const mongodb = require('mongodb').MongoClient;

const client = mongodb;

const dbName = process.env.DB_NAME;
const dbUri = process.env.DB_URI;

client.connect(`${dbUri}/${dbName}`, (err, conn) => {
  if (err) throw err;
  console.log(`DB '${dbName}' created.`);

  conn.db(dbName).createCollection('quotes', (err, res) => {
    if (err) throw err;
    console.log('Collection \'quotes\' created.');
  });

  const quote = {
    author: 'Larry Bird',
    content: 'A winner is someone who recognizes his God-given talents,'
      + ' works his tail off to develop them into skills,'
      + ' and uses these skills to accomplish his goals.'
  };

  conn.db(dbName).collection('quotes').insertOne(quote, (err, res) => {
    if (err) throw err;
    console.log(`Inserted 1 quote by ${quote.author}.`);
  });

  conn.close();
});
