const { supabase, supabaseAuth } = require('../databaseModel');

const burnController = {};

// insert a new burn entry
burnController.postBurn = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // if no auth headers, return status 401
  if (!authHeader) {
    console.log('we are returning bc no headers :(');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // check for JWT access token
  const token = authHeader.split(' ')[1];

  try {
    const { data, error } = await supabaseAuth(token)
      .from('burn_book')
      .insert([
        {
          message: req.body.message,
          username: req.user.user_metadata.username,
          user_id: req.user.id,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.locals.result = data.id;
    return next();
  } catch (err) {
    return next({
      log: `Express error in postBurn middleware: ${err.message}`,
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};

// get all burns from database
burnController.getBurns = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('burn_book')
      .select('*')
      .order('inserted_at', { ascending: false });

    if (error) throw error;

    res.locals.result = data;
    return next();
  } catch (err) {
    return next({
      log: `Express error in getBurns middleware: ${err}`,
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};

// get one burn by ID
burnController.getBurnById = async (req, res, next) => {
  const { id } = req.params; // Assuming the id is passed as a route parameter

  try {
    const { data, error } = await supabase
      .from('burn_book')
      .select('*')
      .eq('id', id)
      .single(); // Assuming 'id' is unique and you expect only one result

    if (error) throw error;

    res.locals.result = data;
    return next();
  } catch (err) {
    return next({
      log: `Express error in getBurnById middleware: ${err}`,
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};

// delete a burn from database
burnController.deleteBurn = async (req, res, next) => {
  const id = req.body.id;
  console.log(id);

  try {
    const { data, error } = await supabase
      .from('burn_book')
      .delete()
      .eq('id', id)
      .single();

    if (error) throw error;

    res.locals.result = data;
    res.sendStatus(204);
    return next();
  } catch (err) {
    return next({
      log: `Express error in deleteBurn middleware: ${err}`,
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};

// update an entry to make it meaner
burnController.updateBurn = async (req, res, next) => {
  const updatedData = req.body.message;
  const id = req.params.id;

  try {
    const { data, error } = await supabase
      .from('burn_book')
      .update({ message: updatedData })
      .eq('id', id)
      .single();

    if (error) throw error;

    res.status(200).json({ data });
  } catch (err) {
    return next({
      log: `Express error in updateBurn middleware: ${err}`,
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};

module.exports = burnController;
