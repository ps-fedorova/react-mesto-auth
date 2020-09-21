class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
    this.message = message;
  }
}

export default BadRequestError;
