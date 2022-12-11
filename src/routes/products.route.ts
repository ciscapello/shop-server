import express from 'express';
import { protect } from '../controllers/auth.controller.js';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  uploadPhoto,
  validateBeforeUpload
} from '../controllers/products.controller.js';

const router = express.Router();

router
  .route('/products')
  .get(getAllProducts)
  .post(protect, validateBeforeUpload, uploadPhoto, createProduct);
router
  .route('/products/:id')
  .get(getProduct)
  .delete(protect, deleteProduct)
  .patch(protect, updateProduct);

export default router;
