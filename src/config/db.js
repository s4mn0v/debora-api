const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres', // Valor de DB_USER
  host: 'junction.proxy.rlwy.net', // Valor de DB_HOST
  database: 'railway', // Valor de DB_NAME
  password: 'GQtBwDUEGmPKMbtDyofizQsNEWuCksXs', // Valor de DB_PASSWORD
  port: 36061, // Valor de DB_PORT
});

module.exports = pool;
