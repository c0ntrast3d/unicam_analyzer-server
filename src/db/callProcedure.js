const Request = require('tedious').Request;
const connection = require('./connection');
const sendDbResponse = require('./utils/sendResponse');
const toJSON = require('./utils/toJSON');

const callProcedure = (query, params, callback) => {
    console.log('\x1b[36m%s\x1b[0m', `callProcedure() :: query - "${query}"`);
    let data = [];
    let dataset = [];
    const request = new Request(
        query,
        (error, rowCount) => {
            sendDbResponse(error, rowCount, dataset, callback);
        }
    );
    params.forEach((param) => {
        const {name, type, val} = param;
        request.addParameter(name, type, val);
    });
    request.on('row', (columns) => {
        toJSON(columns, data);
    });
    request.on('doneInProc', (rowCount, more, rows) => {
        dataset.push(data);
        data = [];
    });
    connection.callProcedure(request);
};

module.exports = callProcedure;
