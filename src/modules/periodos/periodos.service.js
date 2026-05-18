import {
  findAllPeriodos,
  findPeriodoById,
  findPeriodoByGestionPeriodo,
  insertPeriodo,
  updatePeriodoData,
  disableAllPeriodos,
  activatePeriodo
} from './periodos.model.js';

export async function getAllPeriodos() {

  return await findAllPeriodos();

}

export async function getOnePeriodo(id) {

  const periodo = await findPeriodoById(id);

  if (!periodo) {
    throw new Error('Periodo no encontrado');
  }

  return periodo;

}

export async function createNewPeriodo(data) {

  const existingPeriodo =
    await findPeriodoByGestionPeriodo(
      data.gestion,
      data.periodo
    );

  if (existingPeriodo) {
    throw new Error(
      'El periodo ya existe'
    );
  }

  // Si viene activo=true
  if (data.activo === true) {
    await disableAllPeriodos();
  }

  return await insertPeriodo(data);

}

export async function updateExistingPeriodo(
  id,
  data
) {

  const periodo = await findPeriodoById(id);

  if (!periodo) {
    throw new Error('Periodo no encontrado');
  }

  return await updatePeriodoData(id, data);

}

export async function activateExistingPeriodo(
  id
) {

  const periodo = await findPeriodoById(id);

  if (!periodo) {
    throw new Error('Periodo no encontrado');
  }

  // Desactivar todos
  await disableAllPeriodos();

  // Activar seleccionado
  return await activatePeriodo(id);

}