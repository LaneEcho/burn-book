// const { Pool } = require('pg');
// const process = require('process');
const dotenv = require('dotenv');

dotenv.config();

// const PG_URI = process.env.PG_URI;

// const pool = new Pool({
//   connectionString: PG_URI,
// });

// module.exports = pool;

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey); // use this instead of db

module.exports = supabase;
