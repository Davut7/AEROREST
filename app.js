import express from 'express';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import errorHandler from './middleware/errorMiddleware.js';
import indexRouter from './routes/index.js';

const app = express();
const cookieSecret = process.env.COOKIE_SECRET;

app.use(express.json({ limit: '100kb' }));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(cookieSecret));

app.use(cors({ origin: '*' }));

app.use(compression({ level: 6 }));

app.use(morgan('dev'));

app.use(helmet());

app.use('/api', indexRouter);

app.use(errorHandler);
export default app;
