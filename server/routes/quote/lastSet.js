const find = require('../../db').find;

module.exports = async (req, res) => {
  try {
    res.json(await find());
  } catch(e) {
    console.log(e);
    res.status(500).send(e);
  }
};
