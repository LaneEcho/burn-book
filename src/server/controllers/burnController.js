const supabase = require('../databaseModel');

const burnController = {};

// how does supabase RLS check???

// insert a new burn entry
burnController.postBurn = async (req, res, next) => {
  console.log('... in post burn? controller');
  console.log('REQUEST', req.body);
  console.log('REQUEST USER', req.user);

  const meanGirl = req.user;

  console.log('FUCK', req.headers.authorization);

  const newBurn = req.body.message;

  try {
    const { data, error } = await supabase
      .from('burn_book')
      .insert([
        {
          message: newBurn,
          username: meanGirl.user_metadata.username,
          user_id: meanGirl.id,
        },
      ])
      .select() // Use select() to return the inserted row
      .single();

    console.log('returned', data);

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
      .order('id', { ascending: false });

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
