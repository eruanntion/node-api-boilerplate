//region Module dependencies

const http = require('http'); // TODO https
const debug = require('debug')('node-api-boilerplate:server');

const config = require('./config');
const app = require('./config/express');

//endregion

//region Https server

const port = config('http:port');
const server = http.createServer(app);

app.set('port', port);
server.listen(port);
debug('HTTP server created');

server.on('error', error => {
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
});

server.on('listening', () => {
	var addr = server.address();
	var bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	console.log('Listening on ' + bind);
});

//endregion