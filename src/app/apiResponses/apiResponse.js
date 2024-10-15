import HttpStatusCode from '../constants/httpStatusCode.js';

class ApiResponse {
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

class SuccessResponse extends ApiResponse {
  constructor(data) {
    super(HttpStatusCode.Ok, 'Data retrieved successfully');
    this.data = data;
  }
}

class ErrorResponse extends ApiResponse {
  constructor(statusCode, errors) {
    super(statusCode, 'An error has occur');
    this.errors = errors;
  }
}

class BadRequest extends ErrorResponse {
  constructor(message) {
    super(HttpStatusCode.BadRequest, [message]);
  }
}

class Unauthorize extends ErrorResponse {
  constructor() {
    super(HttpStatusCode.Unauthorized, ['Unauthorized']);
  }
}

class Forbiden extends ErrorResponse {
  constructor() {
    super(HttpStatusCode.Unauthorized, ['Can not access to this endpoint']);
  }
}

export { SuccessResponse, BadRequest, Unauthorize, Forbiden };
