// External dependencies
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv-defaults').config();
const express = require('express');

// Internal dependencies
const routes = require('./routes');

// Fetch environment variables
const PORT = process.env.PORT;

// Wire up application
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/', routes);

// Start server
const server = app.listen(PORT, () => {
  console.log('Application running on port ' + server.address().port);
});
