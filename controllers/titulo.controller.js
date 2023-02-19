'use strict';

const db = require('../models');
const Titulo = db.titulo;
const Op = db.Sequelize.Op;

// Cria e salva um novo titulo
const create = (req, res) => {
  // Valida requisicao
  if (!req.body.numero) {
    res.status(400).send({
      message: 'Conteúdo não pode ser vazio.',
      type: 'error'
    });
    return;
  }

  // Propriedades do objeto titulo
  const titulo = {
    advogado: req.body.advogado,
    numero: req.body.numero,
    assistido: req.body.assistido,
    servico: req.body.servico,
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
        message: 'Título cadastrado com sucesso.',
        type: 'success'
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erro ao cadastrar título.',
        type: 'error'
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
      ['id', 'ASC']
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

// Conta linhas
const countRows = (req, res) => {
  Titulo.count()
    .then((data) => {
      let countRows = {
        numLinhas: data
      }
      res.status(200).send(countRows);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erro ao consultar número de título.'
      });
    });
}

// Retorna todos os titulos
const findShort = (req, res) => {
  const limit = parseInt(req.query.limit) || 20
  const page = parseInt(req.query.page) || 1
  const offset = (page - 1) * limit;
  Titulo.findAll({
    attributes: ['id', 'advogado', 'numero', 'assistido', 'servico', 'acesso',
      'arbitrado', 'pleiteado', 'acordado', 'judicial', 'situacao'],
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
    attributes: ['id', 'advogado', 'numero', 'assistido', 'acesso',
      'arbitrado', 'pleiteado', 'acordado', 'judicial', 'situacao'],
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
        message: err.message || `Erro ao consultar título com ID = ${id}`
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
    [Op.or]: [
      { advogado: { [Op.like]: `%${termo}%` } },
      { numero: { [Op.like]: `%${termo}%` } },
      { assistido: { [Op.like]: `%${termo}%` } },
      { acesso: { [Op.like]: `%${termo}%` } },
      { arbitrado: { [Op.like]: `%${termo}%` } },
      { pleiteado: { [Op.like]: `%${termo}%` } },
      { acordado: { [Op.like]: `%${termo}%` } },
      { judicial: { [Op.like]: `%${termo}%` } },
      { situacao: { [Op.like]: `%${termo}%` } },
    ]
  } : null;

  Titulo.findAndCountAll({
    attributes: ['id', 'advogado', 'numero', 'assistido', 'acesso',
      'arbitrado', 'pleiteado', 'acordado', 'judicial', 'situacao'],
    limit, offset, where: condition
  })
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

module.exports = {
  create, findAll, countRows, findShort, findReducedAll,
  findOne, findSome, pageNotFound, update, exclude
};