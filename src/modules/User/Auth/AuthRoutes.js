import { Router } from 'express';
import AuthController from './AuthController.js';

const router = new Router();

router.post('/signIn', AuthController.signIn);

export default router;