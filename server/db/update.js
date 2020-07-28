const ObjectID = require('mongodb').ObjectID;
const dbInstance = require('./instance');

module.exports = async (id, update) => {
  const mongo = await dbInstance();

  const res = await mongo.db.collection('quotes').updateOne(
    { _id: new ObjectID(id) },
    { $set: update }
  );
  console.log(`Updated ${res.modifiedCount} document(s)`);
  mongo.conn.close();

  return res;
};