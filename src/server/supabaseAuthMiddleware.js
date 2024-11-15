const { supabase, supabaseAuth } = require('./databaseModel');

const supabaseAuthMiddleware = {};

supabaseAuthMiddleware.logger = (req, res, next) => {
  console.log(`LOGGER HAPPENING ${req.method} ${req.url}`);
  next();
};

// this is to get the supabase user session and set auth headers

supabaseAuthMiddleware.middleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // if no auth headers, return status 401
  if (!authHeader) {
    console.log('we are returning bc no headers :(');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // check for JWT access token
  const token = authHeader.split(' ')[1];

  const { data, error } = await supabaseAuth(token).auth.getUser(token);

  if (error) {
    console.log('Failed to get Supabase auth user', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // pass user to req object
  req.user = data.user;

  return next();
};

module.exports = supabaseAuthMiddleware;
