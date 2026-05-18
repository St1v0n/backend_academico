import { Router } from 'express';
import { login } from './auth.controller.js';
import { logout } from './auth.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', login);

router.post('/logout', authMiddleware, logout );

export default router;