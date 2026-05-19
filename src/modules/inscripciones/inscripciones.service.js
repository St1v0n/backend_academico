import {
  findActivePeriodo,
  findStudentById,
  findMateriaById,
  findDuplicateInscripcion,
  findPrerrequisitos,
  validateApprovedPrerrequisito,
  insertInscripcion,
  findAllInscripciones,
  findHistorialByStudent,
  findMateriasByCarrera
} from './inscripciones.model.js';

export async function createNewInscripcion(
  data,
  user
) {

  let estudianteId;

  // SI ES ESTUDIANTE
  if (user.rol === 'ESTUDIANTE') {

    estudianteId = user.id;

  }

  // SI ES SECRETARIA
  else if (user.rol === 'SECRETARIA') {

    estudianteId = data.estudiante_id;

    if (!estudianteId) {
      throw new Error(
        'Debe enviar estudiante_id'
      );
    }

  }

  else {

    throw new Error(
      'Rol no autorizado'
    );

  }

  const { materia_id } = data;

  // 1. Validar periodo activo
  const activePeriodo =
    await findActivePeriodo();

  if (!activePeriodo) {
    throw new Error(
      'No existe un periodo activo'
    );
  }

  // 2. Validar estudiante
  const student =
    await findStudentById(estudianteId);

  if (!student) {
    throw new Error(
      'Estudiante no encontrado'
    );
  }

  if (student.rol !== 'ESTUDIANTE') {
    throw new Error(
      'El usuario no es estudiante'
    );
  }

  // 3. Validar materia
  const materia =
    await findMateriaById(materia_id);

  if (!materia) {
    throw new Error(
      'Materia no encontrada'
    );
  }

  // 4. Validar carrera

  if (
    student.carrera_id !==
    materia.carrera_id
  ) {
    throw new Error(
      'La materia no pertenece a la carrera del estudiante'
    );
  }

  // 5. Validar prerrequisitos
  const prerrequisitos =
    await findPrerrequisitos(materia_id);

  for (const prerreq of prerrequisitos) {

    const approved =
      await validateApprovedPrerrequisito(
        estudianteId,
        prerreq.materia_prerrequisito_id
      );

    if (!approved) {
      throw new Error(
        'No cumple los prerrequisitos'
      );
    }

  }

  // 6. Crear inscripción
  return await insertInscripcion(
    estudianteId,
    materia_id,
    activePeriodo.id_periodo
  );

}
export async function getAllInscripciones() {

  return await findAllInscripciones();

}
export async function getHistorialStudent(
  estudianteId
) {

  return await findHistorialByStudent(
    estudianteId
  );

}
export async function getMateriasDisponiblesService(
  estudianteId
) {

  // Buscar estudiante
  const student =
    await findStudentById(
      estudianteId
    );

  if (!student) {

    throw new Error(
      'Estudiante no encontrado'
    );

  }

  // Buscar materias
  const materias =
    await findMateriasByCarrera(
      student.carrera_id
    );

  const resultado = [];

  for (const materia of materias) {

    // Verificar si ya aprobó
    const approved =
      await validateApprovedPrerrequisito(
        estudianteId,
        materia.id_materia
      );

    if (approved) {

      resultado.push({
        ...materia,
        estado: 'APROBADA'
      });

      continue;

    }

    // Buscar prerrequisitos
    const prerrequisitos =
      await findPrerrequisitos(
        materia.id_materia
      );

    let cumple = true;

    for (const prerreq of prerrequisitos) {

      const aprobado =
        await validateApprovedPrerrequisito(
          estudianteId,
          prerreq.materia_prerrequisito_id
        );

      if (!aprobado) {

        cumple = false;
        break;

      }

    }

    resultado.push({
      ...materia,
      estado: cumple
        ? 'DISPONIBLE'
        : 'BLOQUEADA'
    });

  }

  return resultado;

}