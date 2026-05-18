import {
  findAllMaterias,
  findMateriaById,
  findMateriaBySigla,
  findMateriaBySiglaExceptId,
  insertMateria,
  updateMateriaData,
  disableMateriaData
} from './materias.model.js';

export async function getAllMaterias() {

  return await findAllMaterias();

}

export async function getOneMateria(id) {

  const materia = await findMateriaById(id);

  if (!materia) {
    throw new Error('Materia no encontrada');
  }

  return materia;

}

export async function createNewMateria(data) {

  const existingMateria =
    await findMateriaBySigla(data.sigla);

  if (existingMateria) {
    throw new Error(
      'La sigla ya existe'
    );
  }

  return await insertMateria(data);

}

export async function updateExistingMateria(
  id,
  data
) {

  const materia = await findMateriaById(id);

  if (!materia) {
    throw new Error('Materia no encontrada');
  }

  // Verificar sigla duplicada
  const existingSigla =
    await findMateriaBySiglaExceptId(
      data.sigla,
      id
    );

  if (existingSigla) {
    throw new Error(
      'La sigla ya pertenece a otra materia'
    );
  }

  return await updateMateriaData(id, data);

}

export async function disableExistingMateria(
  id
) {

  const materia = await findMateriaById(id);

  if (!materia) {
    throw new Error('Materia no encontrada');
  }

  return await disableMateriaData(id);

}