const fs = require("fs");


module.exports = {
    // key: fs.readFileSync(`${__dirname}/jwtRS256.key`),
    // keyPub: fs.readFileSync(`${__dirname}/jwtRS256.key.pub`),
    key: fs.readFileSync(`${__dirname}/private_key.pem`),
    keyPub: fs.readFileSync(`${__dirname}/public_key.pem`)
};