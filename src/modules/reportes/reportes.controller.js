import {
  reportInscritosMateria,
  reportHistorialEstudiante,
  reportInscritosCarrera,
  reportInscritosPeriodo,
  reportMateriasDocente
} from './reportes.service.js';

export async function getReportMateria(
  req,
  res
) {

  try {

    const { materiaId } = req.params;

    const report =
      await reportInscritosMateria(
        materiaId
      );

    res.json({
      success: true,
      data: report
    });

  } catch (error) {

    res.status(400).json({
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

    const { search } =
      req.query;

    const historial =
      await reportHistorialEstudiante(
        search
      );

    res.json({
      success: true,
      data: historial
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

}

export async function getReportCarrera(
  req,
  res
) {

  try {

    const { carreraId } =
      req.params;

    const report =
      await reportInscritosCarrera(
        carreraId
      );

    res.json({
      success: true,
      data: report
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

}

export async function getReportPeriodo(
  req,
  res
) {

  try {

    const { periodoId } =
      req.params;

    const report =
      await reportInscritosPeriodo(
        periodoId
      );

    res.json({
      success: true,
      data: report
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

}

export async function getMateriasDocenteReport(
  req,
  res
) {

  try {

    const docenteId =
      req.user.id;

    const report =
      await reportMateriasDocente(
        docenteId
      );

    res.json({
      success: true,
      data: report
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

}