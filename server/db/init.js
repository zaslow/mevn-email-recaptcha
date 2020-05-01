const dbInstance = require('./instance');

const defaultQuote = {
  content: 'A winner is someone who recognizes his God-given talents,'
    + ' works his tail off to develop them into skills,'
    + ' and uses these skills to accomplish his goals.',
  name: 'Larry Bird'
};

module.exports = async () => {
  const mongo = await dbInstance();

  try {
    await mongo.db.createCollection('quotes');
    console.log('Collection \'quotes\' created.')
  } catch(e) {
    console.log(e);
  } finally {
    mongo.conn.close();
  }
}
