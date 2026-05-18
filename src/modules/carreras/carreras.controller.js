import {
  getAllCarreras,
  getOneCarrera,
  createNewCarrera,
  updateExistingCarrera,
  disableExistingCarrera
} from './carreras.service.js';

export async function getCarreras(req, res) {

  try {

    const carreras = await getAllCarreras();

    res.status(200).json({
      success: true,
      data: carreras
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

}

export async function getCarreraById(req, res) {

  try {

    const { id } = req.params;

    const carrera = await getOneCarrera(id);

    res.status(200).json({
      success: true,
      data: carrera
    });

  } catch (error) {

    res.status(404).json({
      success: false,
      message: error.message
    });

  }

}

export async function createCarrera(req, res) {

  try {

    const carrera = await createNewCarrera(
      req.body
    );

    res.status(201).json({
      success: true,
      message: 'Carrera creada correctamente',
      data: carrera
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

}

export async function updateCarrera(req, res) {

  try {

    const { id } = req.params;

    const carrera = await updateExistingCarrera(
      id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: 'Carrera actualizada correctamente',
      data: carrera
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

}

export async function disableCarrera(req, res) {

  try {

    const { id } = req.params;

    const carrera = await disableExistingCarrera(
      id
    );

    res.status(200).json({
      success: true,
      message: 'Carrera desactivada correctamente',
      data: carrera
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

}