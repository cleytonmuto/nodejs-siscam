'use strict';

module.exports = (sequelize, DataTypes) => {
    const Usuario_Role = sequelize.define('usuarios_roles', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        roleId: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
    });
    return Usuario_Role;
};
