import express from 'express';
import { login, protect, restrictTo, signUp } from '../controllers/auth.controller.js';
import { getUsers, deleteUser } from '../controllers/users.controller.js';

const router = express.Router();

router.route('/signup').post(signUp);
router.route('/login').post(login);

// router.use(restrictTo('admin'));
router.route('/users').get(protect, restrictTo('admin'), getUsers);
router.route('/users/:id').delete(protect, restrictTo('admin'), deleteUser);

export default router;
