import authService from '../services/authService.js';
import createError from 'http-errors';
import {
	authLoginValidation,
	authRegistrationValidation,
} from '../helper/authValidation.js';

class AuthController {
	async signup(req, res) {
		const { email, password } = req.body;
		const { error } = authRegistrationValidation.validate(req.body, {
			abortEarly: true,
		});
		if (error) throw createError.BadRequest(error.name, error.message);
		const user = await authService.signup(email, password);
		res.cookie('refreshToken', user.refreshToken, {
			maxAge: 24 * 60 * 60 * 1000,
		});
		res.status(200).json({
			message: 'User signup successfully',
			user,
		});
	}

	async signin(req, res) {
		const { email, password } = req.body;
		const { error } = authLoginValidation.validate(req.body, {
			abortEarly: true,
		});
		if (error) throw createError.BadRequest(error.message);
		const user = await authService.signin(email, password);
		res.cookie('refreshToken', user.refreshToken, {
			maxAge: 24 * 60 * 60 * 1000,
		});
		res.status(200).json({
			message: 'Login successful',
			user,
		});
	}

	async refresh(req, res) {
		const { refreshToken } = req.cookies;
		const user = await authService.refresh(refreshToken);
		res.cookie('refreshToken', user.refreshToken, {
			maxAge: 24 * 60 * 60 * 1000,
		});
		res.status(200).json({
			message: 'Refresh tokens successful',
			user,
		});
	}

	async logout(req, res) {
		const { refreshToken } = req.cookies;
		const currentUser = req.user;
		await authService.logout(refreshToken, currentUser);
		res.clearCookie('refreshToken');
		res.json({ message: 'Logout successful' });
	}

	async getMe(req, res) {
		const currentUser = req.user;
		const user = await authService.getMe(currentUser);
		res.status(200).json({
			message: 'Refresh tokens successful',
			user,
		});
	}
}

export default new AuthController();
