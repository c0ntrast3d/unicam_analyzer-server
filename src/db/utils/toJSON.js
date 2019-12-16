const toJSON = (columns, data) => {
    let result = {};
    columns.forEach((column) => {
        result[column.metadata.colName.toLowerCase()] = column.value;
    });
    return data.push[result];
};

module.exports = toJSON;