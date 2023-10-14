import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(private errors: ValidationError[]) {
    super('Error with credentials');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serialiseErrors() {
    const formattedErrors = this.errors.map((err) => {
      if (err.type === 'field') {
        return { message: err.msg, field: err.path };
      }
      return { message: err.msg };
    });
    return formattedErrors;
  }
}
