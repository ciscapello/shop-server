import express, { Response, Request, NextFunction } from 'express';
import productsRouter from './routes/products.route.js';
import usersRouter from './routes/users.route.js';
import morgan from 'morgan';
import globalErrorHandler from './controllers/error.controller.js';

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use('/api', productsRouter);
app.use('/api', usersRouter);

app.use(globalErrorHandler);

export default app;
