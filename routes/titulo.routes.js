'use strict';

const express = require('express');
const tituloRouter = express.Router();

const authJwt = require('../middleware/authJwt');
const controller = require('../controllers/titulo.controller');

tituloRouter.get('/all', controller.findAll);
tituloRouter.get('/short', controller.findShort);
tituloRouter.get('/countRows', controller.countRows);
tituloRouter.get('/404', controller.pageNotFound);
tituloRouter.get('/:id', controller.findOne);

tituloRouter.post('/add', controller.create);
tituloRouter.post('/search', controller.findSome);
tituloRouter.post('/update', [authJwt.verifyToken, authJwt.isAdmin],
  controller.update)

tituloRouter.delete('/delete', [authJwt.verifyToken, authJwt.isAdmin],
  controller.exclude);

module.exports = tituloRouter;
