import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serialiseErrors() });
  }
  res.status(400).send({ message: 'Something went wrong' });
};
