const sendDbResponse = (error, rowCount, data, callback) => {
    if (error) {
        callback(error);
    } else {
        callback(null, data);
    }
};

module.exports = sendDbResponse;