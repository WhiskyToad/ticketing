import { CustomError } from './custom-error';

export class BadRequstError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequstError.prototype);
  }

  serialiseErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
