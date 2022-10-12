const db = require('../db/db')


const User = {
  create: (name, email, passwordDigest, type) => {
      const sql = `
      INSERT INTO users(name, email, password_digest, type)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `
      
      return db
      .query(sql, [name, email, passwordDigest, type])
      .then(dbRes => dbRes.rows[0].email)
  },

  findByEmail: email => {
    const sql = `
    SELECT * FROM users
    WHERE email = $1
    `

    return db
    .query(sql, [email])
    .then(dbRes => dbRes.rows[0])
  },

  findById: id => {
    const sql = `
    SELECT * FROM users
    WHERE id = $1
    `

    return db
    .query(sql, [id])
    .then(dbRes => {
      return {name: dbRes.rows[0].name, email: dbRes.rows[0].email, type: dbRes.rows[0].type}
    })
  }
}

module.exports = User