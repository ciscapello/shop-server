import express from 'express';
import { protect, restrictTo } from '../controllers/auth.controller.js';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  saveImages,
  updateProduct,
  uploadPhoto
} from '../controllers/products.controller.js';

const router = express.Router();

// router.use(restrictTo('admin'));

router.route('/products').get(getAllProducts).post(protect, uploadPhoto, saveImages, createProduct);
router
  .route('/products/:id')
  .get(getProduct)
  .delete(protect, restrictTo('admin'), deleteProduct)
  .patch(protect, restrictTo('admin'), uploadPhoto, saveImages, updateProduct);

export default router;
