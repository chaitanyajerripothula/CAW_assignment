const base = require("./base");
const logger = require('./../lib/winston');

const _ = class extends base {
  constructor(code = null,message=null) {
    super("request");
    this.error.code = code;
    this.error.message = message
    logger.error(this.error);
  }
};

module.exports = _;