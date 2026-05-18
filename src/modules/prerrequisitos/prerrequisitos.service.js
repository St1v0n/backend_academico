import {
  findAllPrerrequisitos,
  findPrerrequisitoByIds,
  insertPrerrequisito,
  deletePrerrequisitoData
} from './prerrequisitos.model.js';

export async function getAllPrerrequisitos() {

  return await findAllPrerrequisitos();

}

export async function createNewPrerrequisito(
  data
) {

  const {
    materia_id,
    materia_prerrequisito_id
  } = data;

  // Evitar misma materia
  if (
    materia_id === materia_prerrequisito_id
  ) {
    throw new Error(
      'Una materia no puede ser prerrequisito de sí misma'
    );
  }

  // Validar duplicado
  const existingPrerrequisito =
    await findPrerrequisitoByIds(
      materia_id,
      materia_prerrequisito_id
    );

  if (existingPrerrequisito) {
    throw new Error(
      'El prerrequisito ya existe'
    );
  }

  return await insertPrerrequisito(
    materia_id,
    materia_prerrequisito_id
  );

}

export async function deleteExistingPrerrequisito(
  id
) {

  return await deletePrerrequisitoData(id);

}