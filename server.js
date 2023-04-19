const express = require('express');
const app = express();
const path = require('path');

// serving static files is important, but is this doing it?
app.use(express.static('src'));
app.use(express.static('src/styles.css', { type: 'text/css' })); // this did not fix it

// serve html file
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../src/index.html'));
});

// serve css file
app.get('/styles.css', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '/src/styles.css'));
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
