// path is a module for working with file paths
const path = require('path');
const express = require('express');
// instance of express library- invoking express
const app = express();
const PORT = 3000;

const burnController = require('./controllers/burnController');

// get request to '/' --> serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// post request for new burn
app.post('/getBurns', burnController.postBurn, (req, res) =>
  res.status(200).json(res.locals.result)
);

// // get request to '/getBurns' --> respond with all the burns
// app.get('/getBurns', burnController.getBurns, (req, res) =>
//   res.status(200).json(res.locals.result)
// );

// // delete router --> delete the burn
// app.delete('/getBurns', burnController.deleteBurn, (req, res) => {
//   res.status(200).json(res.locals.result);
// });

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
