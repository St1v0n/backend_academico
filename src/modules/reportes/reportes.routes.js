import { Router } from 'express';

import {
  getReportMateria,
  getHistorial,
  getReportCarrera,
  getReportPeriodo,
  getMateriasDocenteReport
} from './reportes.controller.js';

import {
  authMiddleware
} from '../../middlewares/auth.middleware.js';

import {
  roleMiddleware
} from '../../middlewares/role.middleware.js';

const router = Router();

router.get(
  '/materia/:materiaId',
  authMiddleware,
  roleMiddleware(
    'SECRETARIA',
    'DOCENTE'
  ),
  getReportMateria
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

router.get(
  '/carrera/:carreraId',
  authMiddleware,
  roleMiddleware(
    'SECRETARIA'
  ),
  getReportCarrera
);

router.get(
  '/periodo/:periodoId',
  authMiddleware,
  roleMiddleware(
    'SECRETARIA'
  ),
  getReportPeriodo
);

router.get(
  '/docente/materias',
  authMiddleware,
  roleMiddleware(
    'DOCENTE'
  ),
  getMateriasDocenteReport
);

export default router;