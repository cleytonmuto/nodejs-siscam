'use strict';

const express = require('express');
const titulosRouter = express.Router();

const authJwt = require('../middleware/authJwt');
const controller = require('../controllers/titulo.controller');

titulosRouter.get('/all', controller.findAll);
titulosRouter.get('/reducedall', controller.findReducedAll);
titulosRouter.get('/404', controller.pageNotFound);
titulosRouter.get('/:id', controller.findOne);

titulosRouter.post('/add', [authJwt.verifyToken, authJwt.isAdmin],
  controller.create);
titulosRouter.post('/search', controller.findSome);
titulosRouter.post('/update', [authJwt.verifyToken, authJwt.isAdmin],
  controller.update)

titulosRouter.delete('/delete', [authJwt.verifyToken, authJwt.isAdmin],
  controller.exclude);

module.exports = titulosRouter;
