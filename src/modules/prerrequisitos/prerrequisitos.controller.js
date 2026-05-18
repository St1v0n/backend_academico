import {
  getAllPrerrequisitos,
  createNewPrerrequisito,
  deleteExistingPrerrequisito
} from './prerrequisitos.service.js';

export async function getPrerrequisitos(
  req,
  res
) {

  try {

    const prerrequisitos =
      await getAllPrerrequisitos();

    res.status(200).json({
      success: true,
      data: prerrequisitos
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

}

export async function createPrerrequisito(
  req,
  res
) {

  try {

    const prerrequisito =
      await createNewPrerrequisito(
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        'Prerrequisito creado correctamente',
      data: prerrequisito
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

}

export async function deletePrerrequisito(
  req,
  res
) {

  try {

    const { id } = req.params;

    const prerrequisito =
      await deleteExistingPrerrequisito(
        id
      );

    res.status(200).json({
      success: true,
      message:
        'Prerrequisito eliminado correctamente',
      data: prerrequisito
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

}