export class BaseError extends Error {
  constructor(message = "Unknown error") {
    super(message);
    this._code = 500;
    this._status = "fail";
    this._data = "Internal server error";
  }

  get code() {
    return this._code;
  }
  get status() {
    return this._status;
  }
  get data() {
    return this._data;
  }
}

export class ValidationError extends BaseError {
  constructor(message = "Validation error") {
    super(message);

    this._code = 400;
    this._status = "error";
    this._data = "Validation error";
  }
}

export class NotFoundError extends BaseError {
  constructor(message = "Not found") {
    super(message);
    this._code = 404;
    this._status = "error";
    this._data = "Not found";
  }
}

export class RouteNotFoundError extends BaseError {
  constructor() {
    super(`Route not found`);

    this._code = 404;
    this._status = "error";
    this._data = "Not found";
  }
}

export class DatabaseError extends BaseError {
  constructor(message = "Conflict") {
    super(message);
    this._code = 409;
    this._status = "error";
    this._data = "Conflict";
  }
}

export class UnAuthorizedError extends BaseError {
  constructor(message = "Unauthorized error") {
    super(message);
    this._code = 401;
    this._status = "error";
    this._data = "Unauthorized";
  }
}

export class ForbiddenError extends BaseError {
  constructor(message = "Forbidden errror") {
    super(message);
    this._code = 403;
    this._status = "error";
    this._data = "Forbidden";
  }
}

export class ServerError extends BaseError {
  constructor(message = "Initial Server error") {
    super(message);
    this._code = 500;
    this._status = "fail";
    this._data = "Internal Server Error";
  }
}

export default {
  BaseError,
  DatabaseError,
  NotFoundError,
  RouteNotFoundError,
  ServerError,
  UnAuthorizedError,
  ValidationError,
  ForbiddenError,
};
