const pg = require('pg')
const localDbName = 'baker_collective'

let db;
if (process.env.DATABASE_URL) {
  db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })
} else {
  if (process.env.DB_PASSWORD) {
    db = new pg.Pool({
      database: localDbName,

      password: process.env.DB_PASSWORD

    })
  } else {
    db = new pg.Pool({
      database: localDbName
    })
  }
}

// const db = new pg.Pool({
//     database: 'baker_collective',
//     password: '1111'
// })


module.exports = db 