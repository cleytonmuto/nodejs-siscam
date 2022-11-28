'use strict';

module.exports = (sequelize, DataTypes) => {
    const Titulo = sequelize.define('titulos', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        advogado: {
          type: DataTypes.STRING,
          allowNull: false
        },
        numero: {
            type: DataTypes.STRING,
            allowNull: false
        },
        assistido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        servico: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        acesso: {
            type: DataTypes.STRING,
            allowNull: false
        },
        arbitrado: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pleiteado: {
            type: DataTypes.STRING,
            allowNull: false
        },
        acordado: {
            type: DataTypes.STRING,
            allowNull: false
        },
        judicial: {
            type: DataTypes.STRING,
            allowNull: false
        },
        situacao: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_520_ci'
    });
    return Titulo;
};
