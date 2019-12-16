const express = require('express');
const bodyParser = require('body-parser');
const createRouter = require('./routes/createRouter');

const server = express();

const port = process.env.PORT || 3300;

server.listen(port, () => {
    console.log(`Server listening on port ${port} ...`);
});

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

const router = createRouter();

server.use('/api', router);

