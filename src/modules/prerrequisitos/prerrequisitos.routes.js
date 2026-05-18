import { Router } from 'express';

import {
  getPrerrequisitos,
  createPrerrequisito,
  deletePrerrequisito
} from './prerrequisitos.controller.js';

import { authMiddleware } from '../../middlewares/auth.middleware.js';

import { roleMiddleware } from '../../middlewares/role.middleware.js';

const router = Router();

router.get(
  '/',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  getPrerrequisitos
);

router.post(
  '/',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  createPrerrequisito
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  deletePrerrequisito
);

export default router;