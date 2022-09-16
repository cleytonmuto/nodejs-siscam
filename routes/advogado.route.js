'use strict';

const express = require('express');
const advogadosRouter = express.Router();

const authJwt = require('../middleware/authJwt');
const controller = require('../controllers/advogado.controller');

advogadosRouter.get('/all', controller.findAll);
advogadosRouter.get('/reducedall', controller.findReducedAll);
advogadosRouter.get('/404', controller.pageNotFound);
advogadosRouter.get('/:id', controller.findOne);

advogadosRouter.post('/add', [authJwt.verifyToken, authJwt.isAdmin],
  controller.create);
advogadosRouter.post('/search', controller.findSome);
advogadosRouter.post('/update', [authJwt.verifyToken, authJwt.isAdmin],
  controller.update)

advogadosRouter.delete('/delete', [authJwt.verifyToken, authJwt.isAdmin],
  controller.exclude);

module.exports = advogadosRouter;
