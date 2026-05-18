import { Router } from 'express';

import {
  getPeriodos,
  getPeriodoById,
  createPeriodo,
  updatePeriodo,
  changePeriodoStatus
} from './periodos.controller.js';

import { authMiddleware } from '../../middlewares/auth.middleware.js';

import { roleMiddleware } from '../../middlewares/role.middleware.js';

const router = Router();

router.get(
  '/',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  getPeriodos
);

router.get(
  '/:id',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  getPeriodoById
);

router.post(
  '/',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  createPeriodo
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  updatePeriodo
);

router.patch(
  '/:id/activate',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  changePeriodoStatus
);

export default router;