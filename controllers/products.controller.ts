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
    // res.status(400).send('There is no product with this ID');
    return next(new AppError('There is no product with this ID', 400));
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

export const deleteProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let product;
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    product = await Products.findByIdAndDelete(req.params.id);
  }
  if (!product) {
    return next(new AppError('There is no products with this ID', 404));
  }
  res.status(200).json({
    status: 'success'
  });
});

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  let product;
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    product = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  }
  if (!product) {
    return next(new AppError('There is no products with this ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: product
  });
};
