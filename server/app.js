const PORT = process.env.PORT || 3000;

// External dependencies
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

// Internal dependencies
const routes = require('./routes');

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
