import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';
import { v4 as uuidv4 } from 'uuid';

const User = sequelize.define('User', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: () => uuidv4(),
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

const Token = sequelize.define('Token', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: () => uuidv4(),
	},
	refreshToken: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	userId: {
		type: DataTypes.UUID,
		allowNull: false,
	},
});

const File = sequelize.define('File', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: () => uuidv4(),
	},

	fileName: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	filePath: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	mimeType: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	size: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	extension: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

User.hasOne(Token, { foreignKey: 'userId' });
Token.belongsTo(User, { foreignKey: 'userId' });

// (async () => {
// 	await sequelize.sync({ force: true });
// 	console.log('All models were synchronized successfully.');
// })();

export { User, Token, File };
