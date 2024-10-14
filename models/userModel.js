const db = require('../config/db')

exports.getAll = (callback) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    callback(err, results)
  })
}

exports.registerUser = (nome, senha, callback) => {
  const query = 'INSERT INTO usuarios (nome, senha) VALUES (?, ?)';
  db.query(query, [nome, senha], (err, results) => {
    callback(err, results);
  });
}

exports.loginUser = (nome, callback) => {
  const query = 'SELECT * FROM usuarios WHERE nome = ? ';
  db.query(query, [nome], (err, result) => {
    callback(err, result)
  });
}