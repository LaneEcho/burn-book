const db = require('../databaseModel');

const burnController = {};

// post burn creates a new burn entry in database
burnController.postBurn = async (req, res, next) => {
  const newBurn = req.body.message;
  // query to just add message to database, expand for usernames in future
  const query = `INSERT INTO burnBook (message)
      VALUES ($1)
      RETURNING *;`;
  const values = [newBurn];
  try {
    //result is an id val
    const result = await db.query(query, values);
    res.locals.result = result.rows[0].id;
    // console log to see result
    console.log('res locals result', res.locals.result);
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
  const query = 'SELECT * FROM burnBook;';

  try {
    const result = await db.query(query);
    res.locals.result = result.rows;
    console.log('res locals result', res.locals.result);
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

  const query = 'DELETE FROM burnBook WHERE id = $1 RETURNING *;';

  try {
    const result = await db.query(query, [id]);
    res.locals.result = result.rows[0];
    console.log('res locals result', res.locals.result);
    return next();
  } catch (err) {
    return next({
      log: `Express error in deleteBurn middleware: ${err}`,
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};

module.exports = burnController;
