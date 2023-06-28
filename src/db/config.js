const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const basicConfig = {
  username: process.env.SEQ_USER,
  password: process.env.SEQ_PW,
  database: process.env.SEQ_DB,
  port: process.env.SEQ_PORT,
  host: process.env.SEQ_HOST,
  dialect: 'postgres',
  logging: false,
};

module.exports = {
  development: basicConfig,
  local: basicConfig,
};
