export class InternalServerError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

export class BadRequestError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class ForbiddenError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class NetworkError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

export class UnknownError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, UnknownError.prototype);
  }
}
