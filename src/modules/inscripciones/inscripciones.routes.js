import { Router } from 'express';

import {
  createInscripcion,
  getInscripciones,
  getHistorial
} from './inscripciones.controller.js';

import { authMiddleware } from '../../middlewares/auth.middleware.js';

import { roleMiddleware } from '../../middlewares/role.middleware.js';

const router = Router();

router.post(
  '/',
  authMiddleware,
  roleMiddleware(
    'SECRETARIA',
    'ESTUDIANTE'
  ),
  createInscripcion
);
router.get(
  '/',
  authMiddleware,
  roleMiddleware('SECRETARIA'),
  getInscripciones
);
router.get(
  '/historial/:estudianteId',
  authMiddleware,
  roleMiddleware(
    'SECRETARIA',
    'ESTUDIANTE'
  ),
  getHistorial
);

export default router;