class CustomError extends Error {
  constructor({ message, status = 500 }) {
    super(message);
    this.errorMessage = message;
    this.name = this.constructor.name;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }

  statusCode() {
    return this.status;
  }
}

module.exports = {
  CustomError
};
