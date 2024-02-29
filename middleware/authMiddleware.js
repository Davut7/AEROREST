import tokenService from '../services/tokenService.js';
import createError from 'http-errors';

export default (req, res, next) => {
	try {
		const authorization = req.headers.authorization;
		if (!authorization) {
			return next(
				createError.Unauthorized('Authorization header is missing')
			);
		}

		const tokenParts = authorization.split(' ');
		if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
			return next(
				createError.Unauthorized('Invalid authorization header')
			);
		}

		const accessToken = tokenParts[1];
		const user = tokenService.verifyAccessToken(accessToken);
		if (!user) {
			return next(createError.Unauthorized('Invalid access token'));
		}

		req.user = user;
		next();
	} catch (error) {
		console.error('Authentication error:', error);
		return next(createError.Unauthorized('Authentication failed'));
	}
};
