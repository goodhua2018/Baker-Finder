const db = require('../db/db')

const Baker = {
    findAll: () => {
        const sql = 'SELECT * FROM bakers ORDER BY id';
        return db
            .query(sql)
            .then(dbRes => dbRes.rows)
    },
    create: (img, name, address, suburb, postcode, contact, specialty, creator) => {
        const sql = `
        INSERT INTO bakers(img, name, address, suburb, postcode, contact, specialty, creator)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
       
    `
    return db
            .query(sql, [img, name, address, suburb, postcode, contact, specialty, creator])
            .then(dbRes => dbRes.rows[0])
    },

    delete: bakerId => {
        const sql = `
            DELETE FROM bakers WHERE id = $1    
        `
        return db.query(sql, [bakerId])
    },
    update: (id, img, name, address, suburb, postcode, contact, specialty) => {
      const sql =`
          UPDATE bakers SET img = $2, name = $3, address = $4, suburb = $5, postcode = $6, contact = $7, specialty = $8
          WHERE id = $1
          RETURNING *
      `
      return db
          .query(sql, [id, img, name, address, suburb, postcode, contact, specialty])
          .then(dbRes => dbRes.rows[0])
  },
  searchByPostcode: (postcode) => {
    const sql = `
      SELECT * FROM bakers 
      WHERE postcode = $1
      
    `
    return db
      .query(sql, [postcode])
      .then(dbRes => {
        console.log(dbRes.rows)
        return dbRes.rows
      })
  },
  searchBySuburb: (suburb) => {
    const sql = `
      SELECT * FROM bakers 
      WHERE lower(suburb) = $1
      
    `
    return db
      .query(sql, [suburb])
      .then(dbRes => {
        console.log(dbRes.rows)
        return dbRes.rows
      })
  },
  findABaker: (loggedInEmail) => {
    const sql = `
      SELECT * FROM bakers
      WHERE creator = $1
    `
    return db
      .query(sql, [loggedInEmail])
      .then(dbRes => {
        console.log(dbRes.rows)
        return dbRes.rows
      })
  },
  findReviewedBakerById: (bakerId) => {
    const sql = `
      SELECT name FROM bakers
      WHERE id = $1
    `
    return db 
      .query(sql, [bakerId])
      .then (dbRes => {
        console.log(dbRes.rows)
        return dbRes.rows[0]
      })
  }
  }

  module.exports = Baker