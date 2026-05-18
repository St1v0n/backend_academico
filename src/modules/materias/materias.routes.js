import { Router } from 'express';

import {
  getMaterias,
  getMateriaById,
  createMateria,
  updateMateria,
  disableMateria
} from './materias.controller.js';

import { authMiddleware } from '../../middlewares/auth.middleware.js';

import { roleMiddleware } from '../../middlewares/role.middleware.js';

const router = Router();

router.get(
  '/',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  getMaterias
);

router.get(
  '/:id',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  getMateriaById
);

router.post(
  '/',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  createMateria
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  updateMateria
);

router.patch(
  '/:id/status',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  disableMateria
);

export default router;