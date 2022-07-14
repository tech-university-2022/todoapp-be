require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const morgan = require('./configs/morgan');
const routes = require('./routers');
const logger = require('./configs/logger');

const app = express();

// morgan format request-response
app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// api routes
app.use('/', routes);

// send back a 404 error for any unknown api request
app.use((req, res) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: httpStatus.NOT_FOUND,
    message: 'Not found',
  });
});

app.listen(process.env.PORT, () => {
  logger.info(`Server is listening at ${process.env.PORT}`);
});
