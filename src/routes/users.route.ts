import express from 'express';
import { createUser, getUsers } from '../controllers/users.controller.js';

const router = express.Router();

router.route('/users').get(getUsers).post(createUser);
// router.route('/products/:id').get(getProduct).delete(deleteProduct).patch(updateProduct);

export default router;
