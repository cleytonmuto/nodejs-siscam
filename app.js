'use strict';

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const db = require('./models');
const routes = require('./routes');

db.sequelize.sync();

app.use(cors({
  origin: 'http://localhost:8000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false
}));

global.__basedir = __dirname;
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT}`);
});
