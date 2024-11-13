const supabase = require('./databaseModel');

const getUserByAuthId = async (authId) => {
  if (!authId) {
    throw new Error('Auth ID is required to fetch user');
  }
};

const supabaseAuthMiddleware = {};

// middleware/logger.js
supabaseAuthMiddleware.logger = (req, res, next) => {
  console.log(`LOGGER HAPPENING ${req.method} ${req.url}`);
  next();
};

// make a supabase client
// do auth headers

supabaseAuthMiddleware.middleware = async (req, res, next) => {
  console.log('... entering auth middleware');
  const authHeader = req.headers.authorization;

  console.log('AUTH HEADER HAPPENING?', authHeader);

  // if no auth headers, return status 401
  if (!authHeader) {
    console.log('we are returning bc no headers :(');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // check for JWT access token
  const token = authHeader.split(' ')[1];
  console.log('TOKEN?', token);

  const { data, error } = await supabase.auth.getUser(token);
  console.log('DATA', data);

  if (error) {
    console.log('Failed to get Supabase auth user', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }

  //   const authId = data.user.id;

  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();

  req.user = data.user;

  return next();
};

module.exports = supabaseAuthMiddleware;
