'use strict';

const config = require('../config/db.config');
const advogadoModel = require('./advogado.model');
const usuarioModel = require('./usuario.model');
const relacaoModel = require('./emprestimo.model');
const roleModel = require('../models/role.model');
const userRolesModel = require('../models/user_roles.model');

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
db.obra = obraModel(sequelize, DataTypes);
db.emprestimo = emprestimoModel(sequelize, DataTypes);
db.role = roleModel(sequelize, DataTypes);
db.user_roles = userRolesModel(sequelize, DataTypes);

db.ROLES = ['user', 'admin'];

db.role.belongsToMany(db.usuario, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});

db.usuario.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});

module.exports = db;
