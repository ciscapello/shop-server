import express from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct
} from '../controllers/products.controller.js';

const router = express.Router();

router.route('/products').get(getAllProducts).post(createProduct);
router.route('/products/:id').get(getProduct).delete(deleteProduct).patch(updateProduct);

export default router;
