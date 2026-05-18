import {
  getAllMaterias,
  getOneMateria,
  createNewMateria,
  updateExistingMateria,
  disableExistingMateria
} from './materias.service.js';

export async function getMaterias(req, res) {

  try {

    const materias =
      await getAllMaterias();

    res.status(200).json({
      success: true,
      data: materias
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

}

export async function getMateriaById(req, res) {

  try {

    const { id } = req.params;

    const materia =
      await getOneMateria(id);

    res.status(200).json({
      success: true,
      data: materia
    });

  } catch (error) {

    res.status(404).json({
      success: false,
      message: error.message
    });

  }

}

export async function createMateria(req, res) {

  try {

    const materia =
      await createNewMateria(req.body);

    res.status(201).json({
      success: true,
      message: 'Materia creada correctamente',
      data: materia
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

}

export async function updateMateria(req, res) {

  try {

    const { id } = req.params;

    const materia =
      await updateExistingMateria(
        id,
        req.body
      );

    res.status(200).json({
      success: true,
      message: 'Materia actualizada correctamente',
      data: materia
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

}

export async function disableMateria(req, res) {

  try {

    const { id } = req.params;

    const materia =
      await disableExistingMateria(id);

    res.status(200).json({
      success: true,
      message: 'Materia desactivada correctamente',
      data: materia
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

}