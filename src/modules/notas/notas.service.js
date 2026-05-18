import {
  findInscripcionById,
  updateNotaFinal,
  findDocenteInscripciones
} from './notas.model.js';

export async function registerNota(
  inscripcionId,
  notaFinal,
  docenteId
) {

  // 1. Validar inscripción

  const inscripcion =
    await findInscripcionById(
      inscripcionId
    );

  if (!inscripcion) {
    throw new Error(
      'Inscripción no encontrada'
    );
  }

  // 2. Validar docente propietario

  if (
    inscripcion.docente_id !==
    docenteId
  ) {
    throw new Error(
      'No autorizado para registrar notas en esta materia'
    );
  }

  // 3. Validar rango nota

  if (
    notaFinal < 0 ||
    notaFinal > 100
  ) {
    throw new Error(
      'La nota debe estar entre 0 y 100'
    );
  }

  // 4. Registrar nota

  return await updateNotaFinal(
    inscripcionId,
    notaFinal
  );

}
export async function getDocenteNotas(
  docenteId
) {

  return await findDocenteInscripciones(
    docenteId
  );

}