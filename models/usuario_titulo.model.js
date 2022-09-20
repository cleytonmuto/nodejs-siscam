'use strict';

module.exports = (sequelize, DataTypes) => {
    const Usuario_Titulo = sequelize.define('usuarios_titulos', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tituloId: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
    });
    return Usuario_Titulo;
};
