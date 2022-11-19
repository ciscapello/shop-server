import express, { Response, Request, NextFunction } from 'express';
import productsRouter from './routes/products.route';
import morgan from 'morgan';
import globalErrorHandler from './controllers/error.controller';

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use('/api', productsRouter);

app.use(globalErrorHandler);

export default app;
