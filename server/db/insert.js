const dbInstance = require('./instance');

module.exports = async msg => {
  const mongo = await dbInstance();

  let quote = {
    ...msg,
    added: new Date(),
    lastSelected: null
  };

  const res = await mongo.db.collection('quotes').insertOne(quote);
  console.log(`Inserted quote ${quote._id} by ${quote.name || 'Anonymous'}.`);
  mongo.conn.close();

  return quote; 
};
