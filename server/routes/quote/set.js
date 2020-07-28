const update = require('../../db').update;

module.exports = async (req, res) => {
  try {
    res.json(await update(req.body.id, { lastSelected: new Date() }));
  } catch(e) {
    console.log(e);
    res.status(500).send(e);
  }
};
