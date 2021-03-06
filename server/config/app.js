/* eslint-disable global-require */
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
// import webpack from 'webpack';
import path from 'path';
import Routes from '../routes/index';

const app = express();
const router = express.Router();

// Log all requests
app.use(morgan('dev'));

// make request body JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const env = process.env.NODE_ENV || 'development';

// using express router for routes
Routes(router);

// prefix /api for all routes
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Welcome to Document Management System');
});

export default app;
