const db = require('../databaseModel');

const burnController = {};

// post burn creates a new burn entry in database
burnController.postBurn = async (req, res, next) => {
  const newBurn = req.body.message;
  // query to just add message to database, expand for usernames in future
  const query = `INSERT INTO burn_book (message)
      VALUES ($1)
      RETURNING *;`;
  const values = [newBurn];
  try {
    //result is an id val
    const result = await db.query(query, values);
    res.locals.result = result.rows[0].id;
    return next();
  } catch (err) {
    return next({
      log: `Express error in postBurn middleware: ${err}`,
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};

// getBurn retrieves all burns from database
burnController.getBurns = async (req, res, next) => {
  const query = 'SELECT * FROM burn_book ORDER BY id ASC;';

  try {
    const result = await db.query(query);
    res.locals.result = result.rows;
    return next();
  } catch (err) {
    return next({
      log: `Express error in getBurns middleware: ${err}`,
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};

// deleteBurn removes a burn from database
burnController.deleteBurn = async (req, res, next) => {
  const id = req.body.id;

  const query = 'DELETE FROM burn_book WHERE id = $1 RETURNING *;';

  try {
    const result = await db.query(query, [id]);
    res.locals.result = result.rows[0];
    return next();
  } catch (err) {
    return next({
      log: `Express error in deleteBurn middleware: ${err}`,
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};

// updateBurn updates an entry to make it meaner
burnController.updateBurn = async (req, res, next) => {
  const updatedData = req.body.message;
  const id = req.params.id;

  const query = 'UPDATE burn_book SET message = $1 WHERE id = $2 RETURNING *;';

  try {
    const result = await db.query(query, [updatedData, id]);
    res.locals.result = result.rows[0];
    return next();
  } catch (err) {
    return next({
      log: `Express error in updateBurn middleware: ${err}`,
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};

module.exports = burnController;
