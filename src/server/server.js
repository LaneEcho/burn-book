// path is a module for working with file paths
const path = require('path');
const express = require('express');
// instance of express library- invoking express
const app = express();
const PORT = 3000;

// root endpoint: is '/'
// get request to '/' --> serve index.html

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// get request to '/getBurns' --> respond with all the burns

// error handling

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// node src/server/server.js
