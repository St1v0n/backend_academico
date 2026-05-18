import {
  createNewInscripcion,
  getAllInscripciones,
  getHistorialStudent
} from './inscripciones.service.js';

export async function createInscripcion(
  req,
  res
) {

  try {

    const inscripcion =
      await createNewInscripcion(
        req.body,
        req.user
      );

    res.status(201).json({
      success: true,
      message:
        'Inscripción realizada correctamente',
      data: inscripcion
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

}
export async function getInscripciones(
  req,
  res
) {

  try {

    const inscripciones =
      await getAllInscripciones();

    res.status(200).json({
      success: true,
      data: inscripciones
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

}
export async function getHistorial(
  req,
  res
) {

  try {

    const { estudianteId } =
      req.params;

    const historial =
      await getHistorialStudent(
        estudianteId
      );

    res.status(200).json({
      success: true,
      data: historial
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

}