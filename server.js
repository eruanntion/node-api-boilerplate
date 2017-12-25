//region Module dependencies

const http = require('http');
const debug = require('debug')('node-api-boilerplate:server');

const config = require('./config');
const app = require('./config/express');
const serverEventHandlers = require('./utils/server-event-handlers');

//endregion

//region Http server

const port = config('http:port');
const server = http.createServer(app);

app.set('port', port);

server.listen(port);

server.on('error', serverEventHandlers.onError);

server.on('listening', serverEventHandlers.onListening);

//endregion