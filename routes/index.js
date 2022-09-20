'use strict';

const express = require('express');
const router = express.Router();

// custom routes
const authRoutes = require('./auth.routes');
const usuarioRoutes = require('./usuario.routes');
const tituloRoutes = require('./titulo.routes');
const relacaoRoutes = require('./relacao.routes');

router.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo(a) ao sistema SISCAM.' });
});

router.use('/api/auth', authRoutes);
router.use('/api/usuarios', usuarioRoutes );
router.use('/api/titulos', tituloRoutes);
router.use('/api/relacoes', relacaoRoutes);

module.exports = router;
