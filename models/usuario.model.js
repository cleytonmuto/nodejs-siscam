'use strict';

module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('usuarios', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        oab: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        endereco: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        observacao: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        }
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_520_ci'
    });
    return Usuario;
};
