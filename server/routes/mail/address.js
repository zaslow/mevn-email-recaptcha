module.exports = (req, res) => {
  try {
    res.json(process.env.EMAIL_USERNAME);
  } catch(error) {
    console.log('Failed to get mail address - ', error);
    res.status(500).send({ error });
  }
};
