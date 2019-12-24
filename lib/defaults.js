const RequestError = require('./../errors/request');
const logger = require('./winston');
const _ ={
    // Requested Resource Not Found
    _404 : async(req,res) =>{
        const code = 404;
        return res.status(code).json(new RequestError(code,"Requested Resource Not Found"));
    },
    // Method Not Allowed
    _405 :  async(req,res) =>{
        const code = 405;
        return res.status(code).json(new RequestError(code,"Method Not Allowed"));
    }
};

module.exports = _;