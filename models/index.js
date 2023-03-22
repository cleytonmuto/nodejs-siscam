'use strict';

const config = require('../config/db.config');
const usuarioModel = require('./usuario.model');
const roleModel = require('./role.model');
const tituloModel = require('./titulo.model');
const usuarioRoleModel = require('./usuario_role.model');
const usuarioTituloModel = require('./usuario_titulo.model');

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_520_ci',
      timestamps: true
    },
    host: config.HOST,
    dialect: config.dialect,
    logging: console.log,
    operatorAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    },
    timezone: config.timezone
  }
);

const db = Object.create(null);

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.DataTypes = DataTypes;

db.usuario = usuarioModel(sequelize, DataTypes);
db.role = roleModel(sequelize, DataTypes);
db.titulo = tituloModel(sequelize, DataTypes);
db.usuario_role = usuarioRoleModel(sequelize, DataTypes);
db.usuario_titulo = usuarioTituloModel(sequelize, DataTypes);

db.ROLES = ['user', 'admin'];

db.role.belongsToMany(db.usuario, {
  through: 'usuarios_roles',
  foreignKey: 'roleId',
  otherKey: 'usuarioId',
});

db.usuario.belongsToMany(db.role, {
  through: 'usuarios_roles',
  foreignKey: 'usuarioId',
  otherKey: 'roleId',
});

db.titulo.belongsToMany(db.usuario, {
  through: 'usuarios_titulos',
  foreignKey: 'tituloId',
  otherKey: 'usuarioId',
});

db.usuario.belongsToMany(db.titulo, {
  through: 'usuarios_titulos',
  foreignKey: 'usuarioId',
  otherKey: 'tituloId',
});

module.exports = db;
