import {
  registerNota,
  getDocenteNotas

} from './notas.service.js';

export async function registerNotaController(
  req,
  res
) {

  try {

    const { inscripcionId } =
      req.params;

    const { nota_final } =
      req.body;

    const docenteId =
      req.user.id;

    const nota =
      await registerNota(
        inscripcionId,
        nota_final,
        docenteId
      );

    res.json({
      success: true,
      message:
        'Nota registrada correctamente',
      data: nota
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

}
export async function getNotasDocente(
  req,
  res
) {

  try {

    const docenteId =
      req.user.id;

    const notas =
      await getDocenteNotas(
        docenteId
      );

    res.status(200).json({
      success: true,
      data: notas
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

}