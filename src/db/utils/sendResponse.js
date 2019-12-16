const sendDbResponse = (error, rowCount, data, callback) => {
    error ? callback(error, false) : callback(null, data);
};

module.exports = sendDbResponse;