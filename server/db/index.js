const find = require('./find');
const init = require('./init');
const insert = require('./insert');
const update = require('./update');

init();

module.exports = {
  find,
  init,
  insert,
  update,
};
