'use strict';

const db = require('../models');
const Titulo = db.titulo;
const Op = db.Sequelize.Op;

// Cria e salvar um novo titulo
const create = (req, res) => {
    // Valida requisicao
    if (!req.body.titulo) {
        res.status(400).send({
            message: 'Conteúdo não pode ser vazio.'
        });
        return;
    }

    // Propriedades do objeto titulo
    const titulo = {
        numero: req.body.numero,
        assistido: req.body.assistido,
        acesso: req.body.acesso,
        arbitrado: req.body.arbitrado,
        pleiteado: req.body.pleiteado,
        acordado: req.body.acordado,
        judicial: req.body.judicial,
        situacao: req.body.situacao
    };

    // Salva o titulo na base
    Titulo.create(titulo)
        .then((data) => {
            res.status(200).send({
                data: data,
                message: 'Título cadastrado com sucesso.'
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Erro ao inserir título.'
            });
        });
};

// Retorna todas os titulos
const findAll = (req, res) => {
    const limit = parseInt(req.query.limit) || 20
    const page = parseInt(req.query.page) || 1
    const offset = (page - 1) * limit;
    Titulo.findAll({
        limit: limit,
        offset: offset,
        order: [
            [ 'id', 'ASC' ]
        ]
    }).then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || 'Erro ao consultar título.'
        });
    });
};

// Retorna todos os titulos
const findReducedAll = (req, res) => {
    const limit = parseInt(req.query.limit) || 20
    const page = parseInt(req.query.page) || 1
    const offset = (page - 1) * limit;
    Titulo.findAll({
        attributes: ['id', 'numero', 'assistido', 'acesso', 'arbitrado', 'pleiteado', 'acordado', 'judicial', 'situacao'],
        limit: limit,
        offset: offset
    }).then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || 'Erro ao consultar título.'
        });
    });
};

// Consulta um unico titulo na base
const findOne = (req, res) => {
    const id = req.params.id;
    Titulo.findByPk(id)
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: `Erro ao consultar título com ID = ${id}`
        });
    });
};

// Consulta alguns titulos de acordo com a condicao
const findSome = (req, res) => {
    const limit = parseInt(req.query.limit) || 20
    const page = parseInt(req.query.page) || 1
    const offset = (page - 1) * limit;
    const termo = req.body.termo;
    const condition = termo ? {
        [Op.or] : [
            { numero: { [Op.like]: `%${termo}%` } },
            { assistido: { [Op.like]: `%${termo}%` } },
            { acesso: { [Op.like]: `%${termo}%` } },
            { arbitrado: { [Op.like]: `%${termo}%` }},
            { pleiteado: { [Op.like]: `%${termo}%` } },
            { acordado: { [Op.like]: `%${termo}%` }},
            { judicial: { [Op.like]: `%${termo}%` } },
            { situacao: { [Op.like]: `%${termo}%` } },
        ]
    } : null;
    Titulo.findAll({ limit, offset, where: condition })
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || 'Erro ao consultar titulo.'
        });
    });
};

const pageNotFound = (req, res) => {
  res.status(404).send('Página não encontrada.');
};

// Atualiza um titulo de acordo com o id da requisicao
const update = (req, res) => {
    const id = req.body.id;
    Titulo.update(req.body, {
        where: { id: id },
    })
    .then((rowsUpdated) => {
      if (Number(rowsUpdated) > 0) {
        res.send({
          message: 'Título atualizado com sucesso.'
        });
      }
      else {
        res.send({
          message: 'Erro ao atualizar título.'
        });
      }
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || 'Erro ao atualizar título.'
        });
    });
};

// Exclui um titulo de acordo com o id da requisicao
const exclude = (req, res) => {
    const id = req.params.id;
    Titulo.destroy({
        where: { id: id },
    })
    .then(() => {
        res.status(200).send('Título excluído com sucesso.');
    })
    .catch((err) => {
        res.status(500).send({
            message: `Não foi possível excluir o título com ID = ${id}`
        });
    });
};

module.exports = { create, findAll, findReducedAll, findOne,
    findSome, pageNotFound, update, exclude };
