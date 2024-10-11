const jwt = require("jsonwebtoken")
const UserModel = require('../models/userModel')
const connection = require('../config/db')

// const express = require('express');
// const app = express()

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

// app.use(authentication)

// app.post("/login", (req, res) => {
//   const user = req.body;

//   const token = jwt.sign({ nome: user.nome }, process.env.TOKEN_KEY);

//   console.log(user);

//   const query = `SELECT * FROM usuarios WHERE nome='${user.nome}'`;

//   connection.query(query, (err, result) => {
//     if (err) return res.status(500).send({ message: "Something went wrong", err });

//     if (result.length === 0) return res.status(404).send({ message: "User not found" });

//     if (result[0].senha !== user.senha) return res.status(401).send({ message: "Wrong password." });

//     return res.status(200).send({ message: "User successfully Logged in", token: token });
//   });
// });

function loginUser(req, res) {
  const user = req.body;
  const token = jwt.sign({ nome: user.nome }, process.env.TOKEN_KEY);

  const query = `SELECT * FROM usuarios WHERE nome = ?`;

  connection.query(query, [user.nome], (err, result) => {
    if (err) return res.status(500).send({ message: "Something went wrong", err });

    if (result.length === 0) return res.status(404).send({ message: "User not found" });

    if (result[0].senha !== user.senha) return res.status(401).send({ message: "Wrong password." });

    return res.status(200).send({ message: "User successfully logged in", token: token });
  });
};

function getAllUsers(req, res) {
  UserModel.getAll((err, users) => {
    console.log(users)
    if (err) {
      res.status(500).send('Erro ao buscar o usuário')
    } else {
      res.status(200).send(users)
    }
  })
}

module.exports = {
  authentication, loginUser, getAllUsers
};