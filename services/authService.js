import bcrypt from 'bcrypt';
import createError from 'http-errors';
import tokenService from './tokenService.js';
import UserDto from '../Dto/UserDto.js';
import { User } from '../models/Model.js';
class AuthService {
	async signup(email, password) {
		const candidate = await User.findOne({
			where: { email: email },
		});
		if (candidate)
			throw createError.Conflict(
				`User with email ${email} already exists`
			);
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			email,
			password: hashedPassword,
			isActive: true,
		});
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(user.id, tokens.refreshToken);
		return {
			id: user.id,
			email: user.email,
			...tokens,
		};
	}

	async signin(email, password) {
		const user = await User.findOne({
			where: { email: email },
		});
		if (!user)
			throw createError.BadRequest(`User with email ${email} not found!`);
		const checkPassword = await bcrypt.compare(password, user.password);
		if (!checkPassword) throw createError.BadRequest(`Wrong password!`);
		const userDto = new UserDto(user);
		user.update({ isActive: true });
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(user.id, tokens.refreshToken);
		return {
			id: user.id,
			email: user.email,
			...tokens,
		};
	}

	async refresh(refreshToken) {
		if (!refreshToken) throw new createError.Unauthorized();
		const tokenFromDb = await tokenService.findToken(refreshToken);
		const verifiedToken = tokenService.verifyRefreshToken(refreshToken);
		if (!tokenFromDb || !verifiedToken)
			throw new createError.Unauthorized();
		const user = await User.findOne({
			where: { id: tokenFromDb.userId },
			attributes: { exclude: ['password'] },
		});
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(user.id, tokens.refreshToken);
		return {
			id: user.id,
			email: user.email,
			...tokens,
		};
	}

	async logout(refreshToken, currentUser) {
		if (!refreshToken) throw new createError.Unauthorized();
		const token = await tokenService.findToken(refreshToken);
		const user = await User.findOne({ where: { id: currentUser.id } });
		await user.update({ isActive: false });
		await tokenService.deleteToken(token.id);
	}

	async getMe(currentUser) {
		const user = await User.findOne({
			where: { id: currentUser.id },
			attributes: { exclude: ['password'] },
		});
		return user;
	}
}

export default new AuthService();
