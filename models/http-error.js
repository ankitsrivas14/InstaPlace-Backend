class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); // Super calls the constructor of the base call => Error
    this.code = errorCode;
  }
}

module.exports = HttpError;
