import { Router } from 'express';

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  disableUser,
  resetPassword,
  getDocentes,
  getEstudiantes
} from './usuarios.controller.js';

import { authMiddleware } from '../../middlewares/auth.middleware.js';

import { roleMiddleware } from '../../middlewares/role.middleware.js';

const router = Router();

router.get(
  '/',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  getUsers
);

router.get(
  '/:id',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  getUserById
);

router.post(
  '/',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  createUser
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  updateUser
);

router.patch(
  '/:id/status',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  disableUser
);

router.patch(
  '/:id/reset-password',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  resetPassword
);
router.get(
  '/docentes/list',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  getDocentes
);
router.get(
  '/estudiantes/list',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  getEstudiantes
);

export default router;