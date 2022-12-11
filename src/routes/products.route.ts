import express from 'express';
import { protect } from '../controllers/auth.controller.js';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  uploadPhoto
} from '../controllers/products.controller.js';

const router = express.Router();

router.route('/products').get(getAllProducts).post(protect, uploadPhoto, createProduct);
router
  .route('/products/:id')
  .get(getProduct)
  .delete(protect, deleteProduct)
  .patch(protect, uploadPhoto, updateProduct);

export default router;
