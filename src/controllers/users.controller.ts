import { NextFunction, Request, Response } from 'express';
import Users from '../models/users.model.js';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users = await Users.find();

  res.status(200).json({
    status: 'success',
    body: users
  });
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = await Users.create(req);

  res.status(200).json({
    status: 'success',
    body: user
  });
};
