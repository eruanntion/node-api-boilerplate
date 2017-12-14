/**
 * on error event handler
 * @public
 * @param error
 */
exports.onError = error => {
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
exports.onListening = function() {
	let address = this.address();
	let bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + address.port;
	console.log('Listening on ' + bind);
};