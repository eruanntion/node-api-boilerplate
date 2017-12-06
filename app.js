//region NPM module dependencies.
const express = require('express');
const http = require('http'); // TODO https
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const debug = require('debug')('node-api-boilerplate:server');
debug('NPM modules loaded');
//endregion

//region Dev module dependencies
const config = require('./config');
const index = require('./routes/index');
const users = require('./routes/users');
debug('Dev modules loaded');
//endregion

const app = express();

//region View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
debug('View engine setup finished');
//endregion

//region Express middleware setup
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
debug('Middleware setup finished');
//endregion

//region Routes loading
app.use('/', index);
app.use('/users', users);
debug('Routes loaded');
//endregion

//region Catch 404 and forward to error handler
app.use(function (req, res, next) {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});
debug('404 catcher loaded');
//endregion

//region Error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});
debug('Express middleware error handler loaded');
//endregion

//region Https server
const port = config.get('http:port');
const server = http.createServer(app);

app.set('port', port);
server.listen(port);
debug('HTTP server created');

server.on('error', (error) => {
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


