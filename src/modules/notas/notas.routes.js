import { Router } from 'express';

import {
  registerNotaController,
  getNotasDocente
} from './notas.controller.js';

import {
  authMiddleware
} from '../../middlewares/auth.middleware.js';

import {
  roleMiddleware
} from '../../middlewares/role.middleware.js';

const router = Router();

router.put(
  '/:inscripcionId',
  authMiddleware,
  roleMiddleware(
    'DOCENTE'
  ),
  registerNotaController
);
router.get(
  '/',
  authMiddleware,
  roleMiddleware(
    'DOCENTE'
  ),
  getNotasDocente
);

export default router;