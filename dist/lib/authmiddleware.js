'use strict';

const jwt = require('jsonwebtoken');
const secrets = require('./secrets');
const authorization = {
    isAuthorized: function (req, res, next) {
        try {
            const token = parseToken(req.headers.token);
            if (token) {
                next();
            } else {
                return res.status(400).send("OOPS!!!!Please Generate Token");
            }
        } catch (err) {
            return res.status(400).send("OOPS!!!!No Token With Requested Resource");
        }
    }
};

function parseToken(token) {
    var _token = token;
    if (_token) {
        var decoded = jwt.verify(_token, secrets.decode_key);
        return decoded;
    } else {
        return undefined;
    }
}

module.exports = authorization;