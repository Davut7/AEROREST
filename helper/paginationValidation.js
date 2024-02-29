import Joi from 'joi';

const paginationSchema = Joi.object({
	page: Joi.number().integer().min(1),
	list_size: Joi.number().integer().min(1).max(100), // Adjust the max value according to your requirements
});

export default paginationSchema;
