const express = require('express')
const connection = require('./config/db')
const userRoutes = require('./routes/userRoutes')
require("dotenv").config()
// const mysql = require('mysql2')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/users', userRoutes);

app.get('/usuarios', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//Rota para resgatar dados do POST do formulário
app.post('/usuarios', (req, res) => {
  const { nome, senha } = req.body; //Resgatando dados do formulário
  if (!nome || !senha) { //Tratamento de erro caso não há dados
    return res.status(400).send('Nome e senha são obrigatórios');
  }
  const query = 'INSERT INTO usuarios (nome, senha) VALUES (?, ?)'; //Query do MySQL
  //Inserindo MANUALMENTE dados na tabela (utilizando query acima)

  connection.query(query, [nome, senha], (err, result) => {
    if (err) { //Tratamento de Erro
      console.error('Erro ao inserir usuário:', err);
      return res.status(500).send('Erro ao inserir usuário');
    }
    res.status(201).send('Usuário inserido com sucesso');
  });
});



const PORT = 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})