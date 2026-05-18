import { Router } from 'express';

import {
  getCarreras,
  getCarreraById,
  createCarrera,
  updateCarrera,
  disableCarrera
} from './carreras.controller.js';

import { authMiddleware } from '../../middlewares/auth.middleware.js';

import { roleMiddleware } from '../../middlewares/role.middleware.js';

const router = Router();

router.get(
  '/',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  getCarreras
);

router.get(
  '/:id',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  getCarreraById
);

router.post(
  '/',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  createCarrera
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  updateCarrera
);

router.patch(
  '/:id/status',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  disableCarrera
);

export default router;