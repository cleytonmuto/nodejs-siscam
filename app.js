'use strict';

const express = require('express');
const app = express();
const cors = require('cors');

const db = require('./models');
const dotenv = require('dotenv');
const path = require('path');

const routes = require('./routes');

global.__basedir = __dirname;

db.sequelize.sync();

app.use(cors({
  origin: 'http://localhost:8000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false
}));

const publicFolder = path.join(__dirname,'public');

app.use(express.static(publicFolder));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

dotenv.config();

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT}`);
});
