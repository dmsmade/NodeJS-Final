import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter';
import rateRouter from './routes/rateRouter';
import clientRouter from './routes/clientRouter';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/rate', rateRouter);
app.use('/client', clientRouter);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/final', { useMongoClient: true });

app.listen(3000);

export default app;