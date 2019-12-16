const Connection = require('tedious').Connection;
const config = require('./configuration');

const connection = new Connection(config);

connection.on('connect', (error) => {
    error ? console.error(error) : console.log('DB Connected ...');
});

module.exports = connection;