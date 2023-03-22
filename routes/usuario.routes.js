'use strict';

const express = require('express');
const usuarioRouter = express.Router();

const authJwt = require('../middleware/authJwt');
const controller = require('../controllers/usuario.controller');

usuarioRouter.get('/all', [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);
usuarioRouter.get('/short', [authJwt.verifyToken, authJwt.isAdmin], controller.findShort);
usuarioRouter.get('/404', controller.pageNotFound);
usuarioRouter.get('/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.findOne);

usuarioRouter.post('/add', [authJwt.verifyToken, authJwt.isAdmin], controller.create);
usuarioRouter.post('/search', [authJwt.verifyToken, authJwt.isAdmin], controller.findSome);
usuarioRouter.post('/update', [authJwt.verifyToken, authJwt.isAdmin], controller.update);

usuarioRouter.delete('/delete', [authJwt.verifyToken, authJwt.isAdmin],
  controller.exclude);

module.exports = usuarioRouter;
