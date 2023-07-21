const { Pool } = require('pg');
const process = require('process');
const dotenv = require('dotenv');

dotenv.config();

const PG_URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = pool;
