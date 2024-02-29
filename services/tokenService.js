import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import { Token } from '../models/Model.js';

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
			expiresIn: '30d',
		});
		const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
			expiresIn: '10m',
		});
		return {
			refreshToken,
			accessToken,
		};
	}

	async saveToken(userId, refreshToken) {
		let token = await Token.findOne({ where: { userId } });
		if (!token) {
			token = await Token.create({ userId, refreshToken });
		} else {
			token.refreshToken = refreshToken;
			await token.save();
		}
		return token;
	}

	async findToken(refreshToken) {
		const token = await Token.findOne({ where: { refreshToken } });
		if (!token) {
			throw createError.NotFound('Token not found');
		}
		return token;
	}

	async deleteToken(refreshToken) {
		await Token.destroy({ where: { refreshToken } });
		return { message: 'Token deleted successfully' };
	}

	verifyRefreshToken(refreshToken) {
		try {
			const userData = jwt.verify(
				refreshToken,
				process.env.REFRESH_SECRET
			);
			return userData;
		} catch (error) {
			return null;
		}
	}

	verifyAccessToken(accessToken) {
		try {
			const userData = jwt.verify(accessToken, process.env.ACCESS_SECRET);
			return userData;
		} catch (error) {
			return null;
		}
	}
}

export default new TokenService();
