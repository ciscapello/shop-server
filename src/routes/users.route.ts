import express from 'express';
import { login, signUp } from '../controllers/auth.controller.js';
import { getUsers, updateUser } from '../controllers/users.controller.js';

const router = express.Router();

router.route('/users').get(getUsers);
router.route('/signup').post(signUp);
router.route('/login').post(login);
router.route('/users/:id').patch(updateUser);

export default router;
