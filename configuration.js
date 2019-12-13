require('dotenv').config();

const config = {
    server: process.env.DB_HOST,
    authentication: {
      options: {
        userName: process.env.DB_USER,
        password: process.env.DB_PASSWORD 
      },
      type: "default"
    },
    options: {
      database: process.env.DB_DATABASE,
      encrypt: true
    }
  };

module.exports = config;