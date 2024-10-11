const jwt = require("jsonwebtoken")
const UserModel = require('../models/userModel')
const connection = require('../config/db')
const path = require('path');


function authentication(req, res, next) {
  const auth = req.headers.authorization;

  console.log(auth)

  if (!auth) {
    return res.status(401).send({ message: "Token Null" });
  }

  const token = auth.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Token Null" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) {
      return res.status(401).send(err);
    }
    next();
  });
}

function renderUserLogin(req, res) {
  res.sendFile(path.resolve('./views/login.html'));
  console.log('x')
}


function registerUser(req, res) {
  const { nome, senha } = req.body; //Resgatando dados do formulário
  if (!nome || !senha) { //Tratamento de erro caso não há dados
    return res.status(400).send('Nome e senha são obrigatórios');
  }
  UserModel.registerUser(nome, senha, (err, result) => {
    if (err) {
      res.status(500).send('Erro ao registrar usuário');
    } else {
      res.status(200).send("Usuario registrado");
    }
  });
}

function loginUser(req, res) {
  const user = req.body

  UserModel.loginUser(user.nome, (err, result) => {
    console.log(err)
    console.log(result)
    if (err) return res.status(500).send({ message: "Something went wrong", err });

    if (result.length === 0) return res.status(404).send({ message: "User not found" });

    if (result[0].senha !== user.senha) return res.status(401).send({ message: "Wrong password." });

    // return res.status(200).send({ message: "User successfully Logged in", token: token });
  })
}



module.exports = {
  authentication, renderUserLogin, registerUser, loginUser
};