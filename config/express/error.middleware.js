//region Module dependencies

const httpStatus = require('http-status');
const expressValidation = require('express-validation');

const config = require('../index');
const APIError = require('./api-error');

//endregion

//region Handlers

/**
 * Catch 404 and forward to error handler
 * @public
 * @param req
 * @param res
 * @param next
 */
exports.notFound = (req, res, next) => {
	const err = new APIError({
		message: 'Not found',
		status: httpStatus.NOT_FOUND,
	});
	next(err);
};


/**
 * If error is not an instanceOf APIError, convert it
 * @public
 * @param req
 * @param res
 * @param next
 */
exports.converter = (err, req, res, next) => {
	let convertedError = err;

	if (err instanceof expressValidation.ValidationError) {
		convertedError = new APIError({
			message: 'Validation Error',
			errors: err.errors,
			status: err.status,
			stack: err.stack,
		});
	} else if (!(err instanceof APIError)) {
		convertedError = new APIError({
			message: err.message,
			status: err.status,
			stack: err.stack,
		});
	}

	next(convertedError);
};

/**
 * Error handler. Send stacktrace only during development
 * @public
 * @param err
 * @param req
 * @param res
 * @param next
 */
exports.handler = (err, req, res, next) => {
	const response = {
		code: err.status || 500,
		message: err.message || httpStatus[err.status],
		errors: err.errors,
		stack: err.stack,
	};

	if (config('env') !== 'development') {
		delete response.stack;
	}

	res.status(err.status).json(response);
};

//endregion