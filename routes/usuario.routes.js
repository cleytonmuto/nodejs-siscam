'use strict';

const express = require('express');
const usuarioRouter = express.Router();

const authJwt = require('../middleware/authJwt');
const controller = require('../controllers/usuario.controller');

usuarioRouter.get('/all', controller.findAll);
usuarioRouter.get('/404', controller.pageNotFound);
usuarioRouter.get('/:id', controller.findOne);

usuarioRouter.post('/add', [authJwt.verifyToken, authJwt.isAdmin],
  controller.create);
usuarioRouter.post('/search', controller.findSome);
usuarioRouter.post('/update', [authJwt.verifyToken, authJwt.isAdmin],
  controller.update)

usuarioRouter.delete('/delete', [authJwt.verifyToken, authJwt.isAdmin],
  controller.exclude);

module.exports = usuarioRouter;
