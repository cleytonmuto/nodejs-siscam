'use strict';

const db = require('../models');
const Relacao = db.usuario_titulo;
const Op = db.Sequelize.Op;

// Cria e salva um novo usuario
const create = (req, res) => {
    // Valida requisicao
    if (!req.body.id_relacao) {
        res.status(400).send({
            message: 'ID da relação não pode ser vazio.'
        });
        return;
    }

    // Cria uma relacao
    const relacao = {
        relacaoId: req.body.relacaoId,
        usuarioId: req.body.usuarioId,
        tituloId: req.body.tituloId
    };

    // Salva a relacao na base
    Relacao.create(relacao)
        .then((data) => {
            res.status(200).send({
                data: data,
                message: 'Relação registrada com sucesso.'
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Erro ao registrar relação.'
            });
        });
};

const pageNotFound = (req, res) => {
    res.status(404).send('Página não encontrada.');
};

// Retorna todos as relacoes
const findAll = (req, res) => {
    console.log('relacao.controller findAll()');
    const limit = parseInt(req.query.limit) || 20
    const page = parseInt(req.query.page) || 1
    const offset = (page - 1) * limit;
    Relacao.findAll({
        limit: limit,
        offset: offset,
        order: [
            ['id', 'ASC']
        ]
    })
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || 'Erro ao consultar empréstimo.'
        });
    });
};

// Encontra uma unica relacao
const findOne = (req, res) => {
    const id = req.params.id;
    Relacao.findByPk(id)
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: `Erro ao consultar empréstimo com ID = ${id}`
        });
    });
};

// Encontra algumas relacoes de acordo com o termo de busca
const findSome = (req, res) => {
    const limit = parseInt(req.query.limit) || 20
    const page = parseInt(req.query.page) || 1
    const offset = (page - 1) * limit;
    const termo = req.body.termo;
    const condition = termo ? {
        [Op.or] : [
            { id: { [Op.like]: `%${termo}%` } },
            { usuarioId: { [Op.like]: `%${termo}%` } },
            { tituloId: { [Op.like]: `%${termo}%` } }
        ]
    } : null;
    Relacao.findAll({ limit, offset, where: condition })
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || 'Erro ao consultar relação.'
        });
    });
};

// Atualiza uma relacao
const update = (req, res) => {
    const id = req.body.id;
    Relacao.update(req.body, {
        where: { id: id }
    })
    .then((rowsUpdated) => {
      if (Number(rowsUpdated) > 0) {
        res.send({
          message: 'Relação atualizada com sucesso.'
        });
      }
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Exclui uma relacao
const exclude = (req, res) => {
    const id = req.params.id;
    Relacao.destroy({
        where: { id: id }
    })
    .then(() => {
        res.status(200).send('Relação excluída com sucesso.');
    })
    .catch((err) => {
        res.status(500).send({
            message: `Não foi possível excluir a relação com ID = ${id}`
        });
    });
};

module.exports = { create, pageNotFound, findAll, findOne, findSome,
  update, exclude };
