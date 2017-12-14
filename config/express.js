//region Module dependencies

const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const methodOverride = require('method-override');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const debug = require('debug')('node-api-boilerplate:express');

const config = require('../config');
const routes = require('../routes');
const error = require('../middlewares/error');

//endregion

/**
 * Express instance
 * @public
 */
const app = express();

//region Express middlewares setup

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Request logging. dev: console | production: file
app.use(logger(config('http:logs')));

// Parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// gzip compression
app.use(compression());

// Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// Enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
app.use(cookieParser());

// Serve static files under public folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routes
app.use('/v:version', routes);

//endregion

//region Error handling

// Catch 404 and forward to error handler
app.use(error.notFound);

//If error is not an instanceOf APIError, convert it
app.use(error.converter);

// Error handler. Send stacktrace only during development
app.use(error.handler);

//endregion

module.exports = app;