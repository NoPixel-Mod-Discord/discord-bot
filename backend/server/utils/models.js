class ReturnValue {
  status;
  body;
  constructor() {
    this.status = 200;
    this.body = {
      err: null,
      data: null,
    };
  }
}

module.exports = ReturnValue;
