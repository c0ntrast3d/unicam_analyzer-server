const { Connection, Request } = require("tedious");
const types = require('tedious').TYPES;
const config = require('./configuration');

const isProduction = process.env.NODE_ENV === 'production'

const connection = new Connection(config);

connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('DB CONNECTED');
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