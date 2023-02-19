'use strict';

const dotenv = require('dotenv');
dotenv.config();

const config = {
  HOST: process.env.HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4'
  },
  timezone: '-03:00',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = config;
