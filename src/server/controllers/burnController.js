const pool = require('./databaseModel.js');
const dotenv = require('dotenv');

const burnController = {};

// post burn creates a new burn entry in database
messageController.postMessage = async (req, res, next) => {
  const newMessage = req.body.message;
  const password = req.body.password;

  const query = `INSERT INTO messages (message, password)
      VALUES ($1, $2)
      RETURNING *;`;
  const values = [newMessage, password];
  try {
    const result = await pool.query(query, values); //result is an id val
    res.locals.result = result.rows[0].id;
    console.log('res locals result', res.locals.result);
    return next();
  } catch (err) {
    return next({
      log: `Express error in postMessage middleware: ${err}`,
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};

// getBurn retrieves all burns from database

// deleteBurn removes a burn from database

module.exports = burnController;
