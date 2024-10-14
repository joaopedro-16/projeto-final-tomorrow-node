const jwt = require("jsonwebtoken")
const UserModel = require('../models/userModel')
const PostModel = require('../models/postModel');
const path = require('path');


function authentication(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).send({ message: "Token Null" });
  }

  const token = auth.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Token Null" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) {
      console.log('Erro de verificação do token:', err);
      return res.status(401).send('Token inválido');
    }
    req.user = user;
    console.log('Usuário autenticado:', req.user);
    next();
  });
}

function renderUserLogin(req, res) {
  res.sendFile(path.resolve('./views/login.html'))
}

function renderUserRegister(req, res) {
  res.sendFile(path.resolve('./views/register.html'))
}

function renderUserFeed(req, res) {
  res.sendFile(path.resolve('./views/feed.html'))
}

function registerUser(req, res) {
  const { nome, senha } = req.body; //Resgatando dados do formulário

  if (!nome || !senha) {
    return res.status(400).send('Nome e senha são obrigatórios');
  }

  UserModel.loginUser(nome, (err, result) => {
    if (err) return res.status(500).send({ message: "Algo deu errado", err })

    if (result.length > 0) {
      return res.status(409).send({ message: "Nome de usuário já existe" })
    }

    UserModel.registerUser(nome, senha, (err, result) => {
      if (err) {
        res.status(500).send('Erro ao registrar usuário')
      } else {
        res.status(200).send("Usuario registrado")
      }
    })
  })
}

function loginUser(req, res) {
  const { nome, senha } = req.body;

  if (!nome || !senha) {
    return res.status(400).json({ message: 'Nome e senha são obrigatórios' });
  }
  UserModel.loginUser(nome, (err, result) => {
    if (err) return res.status(500).send({ message: "Algo deu errado", err });

    if (result.length === 0) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    if (result[0].senha !== senha) {
      return res.status(401).send({ message: "Senha incorreta" });
    }

    const token = jwt.sign({ id: result[0].id }, process.env.TOKEN_KEY, { expiresIn: '2m' });

    res.status(200).json({ token });
  });
}

function createPost(req, res) {
  const { conteudo } = req.body;
  const auth = req.headers.authorization;
  const token = auth.split(" ")[1]

  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) {
      return res.status(401).send('Token inválido')
    }

    PostModel.createPost(user.id, conteudo, (err, result) => {
      if (err) {
        return res.status(500).send('Erro ao criar post')
      }
      res.status(200).send('Post craido com sucesso')
    })
  })

}

function getAllPosts(req, res) {
  PostModel.getAllPosts((err, posts) => {
    if (err) {
      return res.status(500).send('Erro ao buscar posts');
    }
    res.status(200).json(posts);
  });
}

function deletePost(req, res) {
  const postId = req.params.id;
  const userId = req.user.id; // ID do usuário autenticado a partir do token

  // Buscar o post pelo ID e verificar se o post pertence ao usuário
  PostModel.deletePost(postId, userId, (err, result) => {
    if (err) {
      return res.status(500).send({ message: 'Erro ao deletar o post' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Post não encontrado ou não autorizado para deletar' });
    }
    res.send({ message: 'Post deletado com sucesso' });
  });
}



module.exports = {
  authentication, renderUserLogin, renderUserRegister, renderUserFeed, registerUser, loginUser, createPost, getAllPosts, deletePost
}