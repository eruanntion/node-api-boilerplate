//region Module dependencies

const http = require('http');
const debug = require('debug')('node-api-boilerplate:server');

const config = require('./config');
const app = require('./config/express');

//endregion

//region Http server

const port = config('http:port');
const server = http.createServer(app);

app.set('port', port);

server.listen(port);

server.on('error', onError);

server.on('listening', onListening);

//endregion

//region Event handlers

/**
 * on error event handler
 * @param error
 */
function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(port + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(port + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
};

/**
 * on listening event handler
 * @public
 */
function onListening() {
	let address = this.address();
	let bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + address.port;
	console.log('Listening on ' + bind);
}


//endregion

