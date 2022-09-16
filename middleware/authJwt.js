'use strict';

const config = require('../config/auth.config');
const jwt = require('jsonwebtoken');
const db = require('../models');
const Usuario = db.usuario;

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        return res.status(403).send({
            message: 'Nenhum token fornecido.'
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Não autorizado.'
            });
        }    
        req.userId = decoded.id;
        next();
    });
};

const isAdmin = (req, res, next) => {
    Usuario.findByPk(req.userId).then((user) => {
        user.getRoles().then((roles) => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'admin') {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: 'Requer perfil de administrador.'
            });
            return;
        });
    });
};

module.exports = { verifyToken, isAdmin };
