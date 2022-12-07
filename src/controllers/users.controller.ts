import { NextFunction, Request, Response } from 'express';
import Users from '../models/users.model.js';
import catchAsync from '../utils/catchAsync.js';

export const getUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const users = await Users.find();

  res.status(200).json({
    status: 'success',
    body: users
  });
});

export const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

  res.status(200).json({
    status: 'success',
    body: user
  });
});

export const deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await Users.findByIdAndRemove(req.params.id);

  res.status(200).json({
    status: 'success'
  });
});
