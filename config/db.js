const mysql = require('mysql2')

const connection = mysql.createConnection({ //criação da conexão do mysql
  host: 'localhost', //host utilizado
  user: 'aluno', //usuário do bd
  password: 'aluno', //senha do bd
  database: 'node' //nome do schema
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

  connection.query(criarUsuario, (err, result) => {
    if (err) {
      console.error('Erro ao criar tabela:', err);
      return;
    }
    console.log('Tabela "usuarios" criada com sucesso!');
  });
});


module.exports = connection