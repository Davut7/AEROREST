import Joi from 'joi';

const authRegistrationValidation = Joi.object({
	email: Joi.string().email().trim().required(),
	password: Joi.string().min(8).max(30).trim().required(),
});

const authLoginValidation = Joi.object({
	email: Joi.string().email().trim().required(),
	password: Joi.string().min(8).max(30).trim().required(),
});

export { authRegistrationValidation, authLoginValidation };
