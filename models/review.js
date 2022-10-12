const db = require('../db/db')

const Reviews = {
  create: (bakerId, review, rating,userName) => {
    const sql = `
    INSERT INTO reviews(baker_id, review, rating, user_name)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `
    return db
        .query(sql, [bakerId, review, rating, userName])
        .then(dbRes => dbRes.rows[0])
  },

  findAllReviews: (bakerId) => {
    const sql = `
      SELECT * FROM reviews 
      WHERE baker_id = $1
    `
    return db
      .query(sql, [bakerId])
      .then(dbRes => dbRes.rows)
  },

  findRating: (bakerId) => {
    const sql = `
    SELECT AVG(rating) FROM reviews 
    WHERE baker_id = $1
    `
    return db
      .query(sql, [bakerId])
      .then(dbRes => dbRes.rows[0])
  },
  findEachUserReviews: (userName) => {
    const sql = `
      SELECT * FROM reviews 
      WHERE user_name = $1    
    `
    return db
      .query(sql, [userName])
      .then(dbRes => dbRes.rows)
  },
  delete: reviewId => {
      const sql = `
          DELETE FROM reviews WHERE id = $1    
      `
      return db.query(sql, [reviewId])
  }
  

}

module.exports = Reviews