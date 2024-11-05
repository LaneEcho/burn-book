const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../../webpack.config');

// path is a module for working with file paths
const path = require('path');
const express = require('express');
// instance of express library- invoking express
const app = express();
const PORT = 3000;

// create compiler
const compiler = webpack(webpackConfig);
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
);

const burnController = require('./controllers/burnController');

// parse incoming requests
app.use(express.json());

// get request to '/' --> serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// serve index at /signup too
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// will we need these when doing auth?

// API routes
// const APIRouter = express.Router();

// APIRouter.get('/signup', (req, res) => {
//   console.log('SIGNUP ROUTER');
//   return res.json({ message: 'Did you just move here from Africa? Welcome!' });
// });

// app.use('/api', APIRouter); // idk

// post request for new entry in Burn Book
app.post('/getBurns', burnController.postBurn, (req, res) =>
  res.status(201).json(res.locals.result)
);

// get request to retireve all entries
app.get('/getBurns', burnController.getBurns, (req, res) =>
  res.status(200).json(res.locals.result)
);

// get request for one entry
app.get('/getBurns/:id', burnController.getBurnById, (req, res) =>
  res.status(200).json(res.locals.result)
);

// delete an entry
app.delete('/getBurns', burnController.deleteBurn, (req, res) => {
  res.status(204).json(res.locals.result);
});

// update an entry
app.patch('/getBurns/:id', burnController.updateBurn, (req, res) => {
  res.status(200).json(res.locals.result);
});

// Error Handling- catch all
app.use((req, res) => res.sendStatus(404));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log('ERROR: ', errorObj.log);
  const errorStatus = err.status || 500;
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
