const { Connection, Request } = require("tedious");
const types = require('tedious').TYPES;
require('dotenv').config()

const isProduction = process.env.NODE_ENV === 'production'

const config = {
  authentication: {
    options: {
      userName: process.env.DB_USER,
      password: process.env.DB_PASSWORD 
    },
    type: "default"
  },
  server: process.env.DB_HOST,
  options: {
    database: process.env.DB_DATABASE,
    encrypt: true
  }
};

const connection = new Connection(config);

connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('CONNECTED');
    callProcedure();
  }
});

function callProcedure() {
    const request = new Request(
        'svd_s_dati_docente_2018', error => {
            if (error) {
                console.log(error);
              }
        }
    );
    request.addParameter('MATR', types.VarChar, '000447');
    request.addParameter('DaAnnoP', types.BigInt, '2016');
    request.addParameter('AAnnoP', types.BigInt, '2018');

    request.on("row", columns => {
      const result = {};
        columns.forEach(column => {
          result[column.metadata.colName.toLowerCase()] = column.value;
          //console.log("%s\t%s", column.metadata.colName, column.value);
        });
        console.log(result);
      });
    
    connection.callProcedure(request);
}