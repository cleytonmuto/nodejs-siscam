'use strict';

const express = require('express');
const relacaoRouter = express.Router();

const authJwt = require('../middleware/authJwt');
const controller = require('../controllers/emprestimo.controller');

relacaoRouter.get('/all', [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);
relacaoRouter.get('/404', controller.pageNotFound);
relacaoRouter.get('/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.findOne);

relacaoRouter.post('/add', [authJwt.verifyToken, authJwt.isAdmin], controller.create);
relacaoRouter.post('/search', [authJwt.verifyToken, authJwt.isAdmin], controller.findSome);
relacaoRouter.post('/update', [authJwt.verifyToken, authJwt.isAdmin], controller.update);

relacaoRouter.delete('/delete',[authJwt.verifyToken, authJwt.isAdmin], controller.exclude);

module.exports = relacaoRouter;
