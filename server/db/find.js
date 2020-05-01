const dbInstance = require('./instance');

module.exports = async () => {
  const mongo = await dbInstance();

  const res = await mongo.db.collection('quotes')
    .find()
    .limit(1)
    .sort({ $natural: -1 })
    .toArray();
  console.log(`Found 1 quote by ${res[0].author || 'anonymous'}.`);
  mongo.conn.close();

  return res[0];
};
