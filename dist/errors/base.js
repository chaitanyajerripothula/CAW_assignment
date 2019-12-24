"use strict";

const _ = class {
  constructor(type = null) {
    this.error = {
      type: type,
      timestamp: Date.now()
    };
  }
};

module.exports = _;