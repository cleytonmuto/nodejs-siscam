'use strict';

const bcrypt = require('bcryptjs');
const config = require('../config/auth.config');
const db = require('../models');
const jwt = require('jsonwebtoken');

const Usuario = db.usuario;
const Role = db.role;
const Op = db.Sequelize.Op;

const signUp = (req, res) => {
  // salva usuario na base
  Usuario.create({
    nome: req.body.nome,
    oab: req.body.oab,
    cpf: req.body.cpf,
    telefone: req.body.telefone,
    email: req.body.email,
    endereco: req.body.endereco,
    observacao: req.body.observacao,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then((user) => {
      if (req.body.perfis) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.perfis
            }
          }
        })
          .then((perfis) => {
            user.setRoles(perfis).then(() => {
              res.send({ message: 'Usuário cadastrado com sucesso.' });
            });
          });
      }
      else {
        user.setRoles([1]).then(() => {
          res.send({ message: 'Usuário cadastrado com sucesso.' });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

const signIn = (req, res) => {
  Usuario.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Usuário não encontrado.' });
      }
      const isValidPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!isValidPassword) {
        return res.status(401).send({
          accessToken: null,
          message: 'Senha inválida.'
        });
      }
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      const authorities = [];
      user.getRoles().then((perfis) => {
        for (let i = 0; i < perfis.length; i++) {
          authorities.push(`ROLE${perfis[i].name.toUpperCase()}`);
        }
        res.status(200).send({
          id: user.id,
          nome: user.nome,
          oab: user.oab,
          cpf: user.cpf,
          telefone: req.body.telefone,
          email: user.email,
          endereco: user.endereco,
          observacao: user.observacao,
          roles: authorities,
          accessToken: token,
          message: 'Usuário(a) autenticado(a) com sucesso.'
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err + 'Senha ou usuário inválidos.'
      });
    });
}

const changePass = (req, res) => {
  Usuario.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Usuário não encontrado.' });
      }
      const isValidPassword = bcrypt.compareSync(
        req.body.oldPassword,
        user.password
      );
      if (!isValidPassword) {
        return res.status(401).send({
          accessToken: null,
          message: 'Senha antiga inválida.'
        });
      }
      const newEqualRepeat = req.body.newPassword === req.body.repeatPassword;
      if (!newEqualRepeat) {
        return res.status(401).send({
          accessToken: null,
          message: 'A senha repetida não coincide com a nova senha.'
        });
      }
      user.update({
        password: bcrypt.hashSync(req.body.newPassword, 8)
      });
      return res.status(200).send({
        message: 'Senha alterada com sucesso.'
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

const changeNewPass = (req, res) => {
  Usuario.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Usuário não encontrado.' });
      }
      user.update({
        password: bcrypt.hashSync(req.body.newPassword, 8)
      });
      return res.status(200).send({
        message: 'Senha alterada com sucesso.'
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

module.exports = { signUp, signIn, changePass, changeNewPass };
