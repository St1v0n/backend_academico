import {
  findAllCarreras,
  findCarreraById,
  findCarreraByName,
  insertCarrera,
  updateCarreraData,
  disableCarreraData
} from './carreras.model.js';

export async function getAllCarreras() {

  return await findAllCarreras();

}

export async function getOneCarrera(id) {

  const carrera = await findCarreraById(id);

  if (!carrera) {
    throw new Error('Carrera no encontrada');
  }

  return carrera;

}

export async function createNewCarrera(data) {

  const { nombre } = data;

  const existingCarrera =
    await findCarreraByName(nombre);

  if (existingCarrera) {
    throw new Error('La carrera ya existe');
  }

  return await insertCarrera(nombre);

}

export async function updateExistingCarrera(
  id,
  data
) {

  const carrera = await findCarreraById(id);

  if (!carrera) {
    throw new Error('Carrera no encontrada');
  }

  return await updateCarreraData(
    id,
    data.nombre
  );

}

export async function disableExistingCarrera(id) {

  const carrera = await findCarreraById(id);

  if (!carrera) {
    throw new Error('Carrera no encontrada');
  }

  return await disableCarreraData(id);

}