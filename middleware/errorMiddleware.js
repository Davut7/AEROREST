import createError from 'http-errors';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
	let statusCode = err.statusCode || 500;
	let errorMessage = err.message || 'Internal Server Error';

	if (createError.isHttpError(err)) {
		statusCode = err.statusCode;
		errorMessage = err.message;
	}

	res.status(statusCode).json({
		error: errorMessage,
	});
};

export default errorHandler;
