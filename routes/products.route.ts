import express from 'express';
import {
  createProduct,
  // createActor,
  // deleteActor,
  // getActor,
  getAllProducts,
  getProduct
  // updateActor,
} from '../controllers/products.controller';

const router = express.Router();

router.route('/products').get(getAllProducts).post(createProduct);
router.route('/products/:id').get(getProduct);
// router.route("/:id").get(getActor).patch(updateActor).delete(deleteActor);

export default router;
