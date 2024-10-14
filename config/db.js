const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL!');

  const criarUsuario = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      senha VARCHAR(100) NOT NULL
    );
  `;

  const criarPosts = `
    CREATE TABLE IF NOT EXISTS posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      conteudo TEXT NOT NULL,
      usuario_id INT,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    );
  `;

  connection.query(criarUsuario, (err, result) => {
    if (err) {
      console.error('Erro ao criar tabela:', err);
      return;
    }
    console.log('Tabela "usuarios" criada com sucesso!');
  });

  connection.query(criarPosts, (err, result) => {
    if (err) {
      console.error('Erro ao criar tabela "posts":', err);
      return;
    }
    console.log('Tabela "posts" criada com sucesso!');
  });
});


module.exports = connection