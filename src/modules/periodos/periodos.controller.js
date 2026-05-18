import {
  getAllPeriodos,
  getOnePeriodo,
  createNewPeriodo,
  updateExistingPeriodo,
  activateExistingPeriodo
} from './periodos.service.js';

export async function getPeriodos(req, res) {

  try {

    const periodos =
      await getAllPeriodos();

    res.status(200).json({
      success: true,
      data: periodos
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

}

export async function getPeriodoById(req, res) {

  try {

    const { id } = req.params;

    const periodo =
      await getOnePeriodo(id);

    res.status(200).json({
      success: true,
      data: periodo
    });

  } catch (error) {

    res.status(404).json({
      success: false,
      message: error.message
    });

  }

}

export async function createPeriodo(req, res) {

  try {

    const periodo =
      await createNewPeriodo(req.body);

    res.status(201).json({
      success: true,
      message: 'Periodo creado correctamente',
      data: periodo
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

}

export async function updatePeriodo(req, res) {

  try {

    const { id } = req.params;

    const periodo =
      await updateExistingPeriodo(
        id,
        req.body
      );

    res.status(200).json({
      success: true,
      message: 'Periodo actualizado correctamente',
      data: periodo
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

}

export async function changePeriodoStatus(
  req,
  res
) {

  try {

    const { id } = req.params;

    const periodo =
      await activateExistingPeriodo(id);

    res.status(200).json({
      success: true,
      message: 'Periodo activado correctamente',
      data: periodo
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

}