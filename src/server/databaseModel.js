const dotenv = require('dotenv');

dotenv.config();

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const supabaseAuth = (accessToken) => {
  return createClient(supabaseUrl, supabaseKey, {
    db: {
      schema: 'public',
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : null,
    },
  });
};

module.exports = {
  supabase,
  supabaseAuth,
};
