import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Products from '../models/products.model';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Products.find();
  res.status(200).json({
    status: 'success',
    results: products.length,
    body: products
  });
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  let product;
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    product = await Products.findById(req.params.id);
  }
  if (!product) {
    next(new AppError('HUEVA', 400));
    // return res.status(400).json({
    //   status: 'failed',
    //   body: 'Invalid ID'
    // });
  }
  res.status(200).json({
    status: 'success',
    body: product
  });
};

export const createProduct = catchAsync(async (req: Request, res: Response) => {
  const newProduct = await Products.create(req.body);
  res.status(200).json({
    status: 'success',
    data: newProduct
  });
});

// export const updateProduct = (req: Request, res: Response) => {
//   res.status(200).json({
//     status: "success",
//     data: "This request yet not have response",
//   });
// };

// export const deleteProduct = (req: Request, res: Response) => {
//   res.status(200).json({
//     status: "success",
//     data: "This request yet not have response",
//   });
// };
