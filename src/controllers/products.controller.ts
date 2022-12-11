import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Products from '../models/products.model.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import multer, { FileFilterCallback } from 'multer';
import { transliteration } from '../utils/transliteration.js';
import * as fs from 'node:fs';
import { getFiles } from '../utils/getFiles.js';
import { IProducts } from '../models/products.model.js';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const multerStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callback: DestinationCallback) => {
    callback(null, 'public/img');
  },
  filename: (req: Request, file: Express.Multer.File, callback: FileNameCallback): void => {
    const ext = file.mimetype.split('/')[1];
    callback(null, `${transliteration(req.body.name)}-${Date.now()}.${ext}`);
  }
});

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (file.mimetype.startsWith('image') && req.body.name) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

export const uploadPhoto = upload.array('images', 7);

export const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const products = await Products.find();
  res.status(200).json({
    status: 'success',
    results: products.length,
    body: products
  });
});

export const getProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let product;
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    product = await Products.findById(req.params.id);
  }
  if (!product) {
    return next(new AppError('There is no product with this ID', 400));
  }
  res.status(200).json({
    status: 'success',
    body: product
  });
});

export const createProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.files) {
    return next(new AppError('You should provide at least one image', 400));
  }
  const product = req.body;
  const images: string[] = [];
  const files = req.files as Express.Multer.File[];
  files.forEach((elem, i) => {
    images.push(elem.filename);
  });
  product.images = images;
  const newProduct = await Products.create(product);
  res.status(200).json({
    status: 'success',
    data: { newProduct }
  });
});

export const deleteProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let product: IProducts | null = null;
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    product = await Products.findByIdAndDelete(req.params.id);
  }
  if (!product) {
    return next(new AppError('There is no products with this ID', 404));
  }
  let images = getFiles(`public/img`);
  images.forEach((elem) => {
    if (elem.split('/')[2].startsWith(transliteration(product!.name))) {
      fs.unlink(elem, () => console.log(elem, 'deleted'));
    }
  });
  res.status(200).json({
    status: 'success'
  });
});

export const updateProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let product: IProducts | null = null;
  let oldImages;
  const files = req.files as Express.Multer.File[];
  let images: string[] = [];
  files.forEach((elem, i) => {
    images.push(elem.filename);
  });
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    let oldProduct = await Products.findById(req.params.id);
    oldImages = oldProduct?.images;
    product = await Products.findByIdAndUpdate(
      req.params.id,
      { ...req.body, images },
      {
        new: true,
        runValidators: true
      }
    );
  }
  oldImages?.map((elem) => {
    fs.unlink(`public/img/${elem}`, () => console.log(elem, 'deleted'));
  });
  if (!product) {
    files.map((elem) => {
      fs.unlink(`public/img/${elem.filename}`, () => console.log(elem, 'deleted'));
    });
    return next(new AppError('There is no products with this ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: product
  });
});
