const dbInstance = require('./instance');

module.exports = async () => {
  const mongo = await dbInstance();

  const [res] = await mongo.db.collection('quotes')
    .find()
    .sort({ lastSelected: -1 })
    .toArray();
  console.log(`Found 1 quote by ${res.name || 'anonymous'}.`);
  mongo.conn.close();

  return res;
};
