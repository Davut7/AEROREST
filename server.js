import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import app from './app.js';
const port = process.env.PORT;

process.on('uncaughtException', (err) => {
	console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
	console.log(err.name, err.message);
	process.exit(1);
});

const server = app.listen(port, () => {
	console.log(`Your server is listening on port ${port}`);
});

process.on('unhandledRejection', (err) => {
	console.log('UNHANDLED REJECTION! 💥 Shutting down...');
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
