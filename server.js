//region Module dependencies

const http = require('http'); // TODO https
const debug = require('debug')('node-api-boilerplate:server');

const config = require('./config');
const app = require('./config/express');
const serverHandlers = require('./utils/server-handlers');

//endregion

//region Https server

const port = config('http:port');
const server = http.createServer(app);

app.set('port', port);

server.listen(port);

server.on('error', serverHandlers.onError);

server.on('listening', serverHandlers.onListening);

//endregion