import { Request, Response } from 'express';
import Products from '../models/products.model';

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Products.find();
  res.status(200).json({
    status: 'success',
    body: products
  });
};

// export const getProduct = async (req: Request, res: Response) => {
//   res.status(200).json({
//     status: "success",
//     data: "This request yet not have response",
//   });
// };

// export const createProduct = async (req: Request, res: Response) => {
//   res.status(200).json({
//     status: "success",
//     data: "This request yet not have response",
//   });
// };

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
