import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { BadRequstError } from '../errors';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 30 }).withMessage('Password must be between 4 and 20 characters'),
  ],
  validationResult,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequstError('Error with credentials');
    }
    const user = User.build({ email, password });
    await user.save();
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!,
    );
    req.session = { jwt: userJwt };
    res.status(201).send(user);
  },
);

export { router as signupRouter };
