import {
  getInscritosByMateria,
  getHistorialEstudiante,
  getInscritosByCarrera,
  getInscritosByPeriodo,
  getMateriasDocente
} from './reportes.model.js';

export async function reportInscritosMateria(
  materiaId
) {

  const report =
    await getInscritosByMateria(
      materiaId
    );

  if (report.length === 0) {
    throw new Error(
      'No existen inscritos para esta materia'
    );
  }

  return report;

}

export async function reportHistorialEstudiante(
  estudianteId
) {

  const historial =
    await getHistorialEstudiante(
      estudianteId
    );

  if (historial.length === 0) {
    throw new Error(
      'El estudiante no tiene historial académico'
    );
  }

  return historial;

}

export async function reportInscritosCarrera(
  carreraId
) {

  return await getInscritosByCarrera(
    carreraId
  );
  }


export async function reportInscritosPeriodo(
  periodoId
) {

  const report =
    await getInscritosByPeriodo(
      periodoId
    );

  if (report.length === 0) {
    throw new Error(
      'No existen inscritos para este periodo'
    );
  }

  return report;

}

export async function reportMateriasDocente(
  docenteId
) {

  const report =
    await getMateriasDocente(
      docenteId
    );

  if (report.length === 0) {
    throw new Error(
      'El docente no tiene materias asignadas'
    );
  }

  return report;

}