const db = require('../db/db')

const Rating = {
  create: (bakerId, rating, userName) => {
    const sql = `
    INSERT INTO rating(baker_id, rating, user_name)
    VALUES ($1, $2, $3)
    RETURNING *
  `
return db
        .query(sql, [bakerId, rating, userName])
        .then(dbRes => dbRes.rows[0])
  }
}

module.exports = Rating