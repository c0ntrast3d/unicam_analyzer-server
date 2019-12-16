const dotenv = require('dotenv')

dotenv.config()

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env

const config = {
  server: DB_HOST,
  authentication: {
    options: {
      userName: DB_USER,
      password: DB_PASSWORD
    },
    type: 'default'
  },
  options: {
    database: DB_DATABASE,
    encrypt: true
  }
}

module.exports = config