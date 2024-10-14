const db = require('../config/db')


exports.createPost = (userId, conteudo, callback) => {
  const query = 'INSERT INTO posts (usuario_id, conteudo) VALUES (?, ?)'
  db.query(query, [userId, conteudo], (err, result) => {
    callback(err, result)
  })
}

exports.getAllPosts = (callback) => {
  const query = 'SELECT * FROM posts';
  db.query(query, (err, results) => {
    callback(err, results);
  });
}

exports.deletePost = (postId, userId, callback) => {
  const query = 'DELETE FROM posts WHERE id = ? AND usuario_id = ?';
  db.query(query, [postId, userId], (err, result) => {
    callback(err, result);
  });
}