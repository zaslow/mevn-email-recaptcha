// Configuration
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const PORT = process.env.PORT || 3000;

// External dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Internal dependencies
const routes = require('./routes');

// Wire up application
const app = express();
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use('/', routes);

// Start server
const server = app.listen(PORT, () => {
  console.log('Application running on port ' + server.address().port);
});
