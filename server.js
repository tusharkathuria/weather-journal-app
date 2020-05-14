// Setup empty JS object to act as endpoint for all routes
const routes = require('./routes');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

// Initialize the main project folder
app.use(express.static('website'));

app.listen(port, () => console.log(`Server running on port ${port}`));