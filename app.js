// Imports
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const productRouter = require('./routes/products');
const categoryRouter = require('./routes/categories');
const orderRouter = require('./routes/orders');
const userRouter = require('./routes/users');

// Load and configure environment variables from .env file
require('dotenv/config');

// Create Express app
const app = express();
const api = process.env.API_URL;
const port = process.env.PORT;
const www = process.env.WWW || './';

// Serve static files
app.use(express.static(www));
// ^ This middleware function serves static files such as HTML, CSS, JavaScript, images, etc. from the specified `www` directory.
// ^ It is injected into the middleware chain, allowing the server to serve static files when requested by clients.

// Parse JSON requests
app.use(express.json());
// ^ This middleware function parses incoming requests with JSON payloads and makes the JSON data available on `req.body`.
// ^ It is injected into the middleware chain to enable the backend to understand and process JSON data sent by clients.

// Log API calls
app.use(morgan('tiny'));
// ^ This middleware function logs incoming API requests to the console in a concise format.
// ^ It is injected into the middleware chain to provide request logging for debugging and monitoring purposes.

// Define Routers
app.use(`${api}/products`, productRouter);
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/orders`, orderRouter);
app.use(`${api}/users`, userRouter);
// ^ These middleware functions define the routes for different resources such as products, categories, orders, and users.
// ^ They are injected into the middleware chain to handle requests related to these resources based on the specified routes.

// Connect to the database
mongoose.connect(process.env.ESHOP_DATABASE)
  .then(() => {
    console.log('Database is ready');
  })
  .catch((error) => {
    console.log(error.message);
  });
// ^ This code connects to the MongoDB database using the connection string specified in the `ESHOP_DATABASE` environment variable.
// ^ It is executed during the server startup to establish a connection to the database.
// ^ The `then` block is executed when the connection is successfully established, and the `catch` block handles any errors that occur.

// Start the server
app.listen(port, () => {
  console.log(`App Server is live`);
});
// ^ This code starts the server and listens on the specified `port` for incoming requests.
// ^ It is executed during the server startup to make the application accessible and responsive to client requests.

// Test index.html route
app.get(`${api}/test`, (req, res) => {
  res.sendFile(`index.html`, { root: www });
});
// ^ This code defines a test route that serves the `index.html` file from the `www` directory when accessed.
// ^ It is injected into the middleware chain to provide a simple test endpoint that can be used to verify the server's functionality.
