'use strict';

const express = require('express');
const tituloRouter = express.Router();

const authJwt = require('../middleware/authJwt');
const controller = require('../controllers/titulo.controller');

tituloRouter.get('/all', [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);
tituloRouter.get('/short', [authJwt.verifyToken, authJwt.isAdmin], controller.findShort);
tituloRouter.get('/countRows', [authJwt.verifyToken, authJwt.isAdmin], controller.countRows);
tituloRouter.get('/404', controller.pageNotFound);
tituloRouter.get('/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.findOne);

tituloRouter.post('/add', [authJwt.verifyToken, authJwt.isAdmin], controller.create);
tituloRouter.post('/search', [authJwt.verifyToken, authJwt.isAdmin], controller.findSome);
tituloRouter.post('/update', [authJwt.verifyToken, authJwt.isAdmin],
  controller.update)

tituloRouter.delete('/delete', [authJwt.verifyToken, authJwt.isAdmin],
  controller.exclude);

module.exports = tituloRouter;
