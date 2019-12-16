sendDbResponse = (error, rowCount, data, callback) => {
    if (error) {
        callback(error);
    } else {
        (rowCount < 1) ? callback(null, false) : callback(null, data, rowCount);
    }
};

module.exports = sendDbResponse;