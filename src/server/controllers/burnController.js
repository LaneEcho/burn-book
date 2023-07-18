const db = require('../databaseModel');

const burnController = {};

// post burn creates a new burn entry in database
burnController.postBurn = async (req, res, next) => {
  const newBurn = req.body.message;
  console.log('New burn', newBurn);

  const query = `INSERT INTO burnBook (name, message)
      VALUES ($1. $2)
      RETURNING *;`;
  const values = [newBurn];
  try {
    const result = await db.query(query, values); //result is an id val
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

// deleteBurn removes a burn from database

module.exports = burnController;
