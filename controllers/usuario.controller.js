'use strict';

const db = require('../models');
const Usuario = db.usuario;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');

// Cria e salva um novo usuario
const create = (req, res) => {
  // Valida requisicao
  if (!req.body.oab) {
    res.status(400).send({
      message: 'OAB não pode ser vazio.',
      type: 'error'
    });
    return;
  }

  // Cria um usuario
  const usuario = {
    nome: req.body.nome,
    oab: req.body.oab,
    cpf: req.body.cpf,
    telefone: req.body.telefone,
    email: req.body.email,
    endereco: req.body.endereco,
    observacao: req.body.observacao,
    password: bcrypt.hashSync(req.body.password, 8)
  };

  // Salva o usuario na base
  Usuario.create(usuario)
    .then((data) => {
      res.status(200).send({
        data: data,
        message: 'Usuário cadastrado com sucesso.',
        type: 'success'
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erro ao inserir usuário.',
        type: 'error'
      });
    });
};

const pageNotFound = (req, res) => {
  res.status(404).send('Página não encontrada.');
};

// Retorna todos os usuarios
const findAll = (req, res) => {
  console.log('usuario.controller findAll()');
  console.log('tentativa de acesso');
  const limit = parseInt(req.query.limit) || 20
  const page = parseInt(req.query.page) || 1
  const offset = (page - 1) * limit;
  Usuario.findAll({
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
        message: err.message || 'Erro ao consultar usuário.'
      });
    });
};


// Retorna informacoes resumidas dos usuarios
const findShort = (req, res) => {
  console.log('usuario.controller findShort()');
  console.log('tentativa de acesso');
  const limit = parseInt(req.query.limit) || 20
  const page = parseInt(req.query.page) || 1
  const offset = (page - 1) * limit;
  Usuario.findAll({
    attributes: ['id', 'nome', 'oab', 'cpf', 'telefone',
      'email', 'endereco', 'observacao'],
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
        message: err.message || 'Erro ao consultar usuário.'
      });
    });
};

// Encontra um unico usuario na base
const findOne = (req, res) => {
  const id = req.params.id;
  Usuario.findByPk(id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Erro ao consultar usuário com ID = ${id}`
      });
    });
};

// Encontra alguns usuarios de acordo com o termo de busca
const findSome = (req, res) => {
  const limit = parseInt(req.query.limit) || 20
  const page = parseInt(req.query.page) || 1
  const offset = (page - 1) * limit;
  const termo = req.body.termo;
  const condition = termo ? {
    [Op.or]: [
      { nome: { [Op.like]: `%${termo}%` } },
      { oab: { [Op.like]: `%${termo}%` } },
      { cpf: { [Op.like]: `%${termo}%` } },
      { telefone: { [Op.like]: `%${termo}%` } },
      { email: { [Op.like]: `%${termo}%` } },
      { endereco: { [Op.like]: `%${termo}%` } },
      { observacao: { [Op.like]: `%${termo}%` } }
    ]
  } : null;
  Usuario.findAndCountAll({
    attributes: ['id', 'nome', 'oab', 'cpf', 'telefone', 'email'],
    limit, offset, where: condition
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erro ao consultar usuário.'
      });
    });
};

const findNames = (req, res) => {
  const limit = parseInt(req.query.limit) || 20
  const page = parseInt(req.query.page) || 1
  const offset = (page - 1) * limit;
  Usuario.findAll({
    attributes: ['id', 'nome'],
    limit: limit,
    offset: offset,
    order: [
      ['nome', 'ASC']
    ]
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erro ao consultar usuário.'
      });
    });
};

// Atualiza um usuario
const update = (req, res) => {
  const id = req.body.id;
  Usuario.update(req.body, {
    where: { id: id }
  })
    .then((rowsUpdated) => {
      if (Number(rowsUpdated) > 0) {
        res.send({
          message: 'Usuário atualizado com sucesso.'
        });
      }
      else {
        res.send({
          message: 'Erro ao atualizar usuário.'
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erro ao atualizar usuário.'
      });
    });
};

// Exclui um usuário
const exclude = (req, res) => {
  const id = req.params.id;
  Usuario.destroy({
    where: { id: id }
  })
    .then(() => {
      res.status(200).send('Usuário excluído com sucesso.');
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Não foi possível excluir o usuário com ID=${id}`
      });
    });
};

module.exports = {
  create, pageNotFound, findAll, findShort, findOne,
  findSome, findNames, update, exclude
};
