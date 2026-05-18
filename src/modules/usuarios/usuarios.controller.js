import {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateExistingUser,
  disableExistingUser,
  resetUserPassword,
  getDocentesService,
  getEstudiantesService
} from './usuarios.service.js';

export async function getUsers(req, res) {

  try {

    const users = await getAllUsers();

    res.status(200).json({
      success: true,
      data: users
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

}

export async function getUserById(req, res) {

  try {

    const { id } = req.params;

    const user = await getOneUser(id);

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {

    res.status(404).json({
      success: false,
      message: error.message
    });

  }

}

export async function createUser(req, res) {

  try {

    const user = await createNewUser(req.body);

    res.status(201).json({
      success: true,
      message: 'Usuario creado correctamente',
      data: user
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

}

export async function updateUser(req, res) {

  try {

    const { id } = req.params;

    const updatedUser = await updateExistingUser(
      id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: 'Usuario actualizado correctamente',
      data: updatedUser
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

}

export async function disableUser(req, res) {

  try {

    const { id } = req.params;

    const user = await disableExistingUser(id);

    res.status(200).json({
      success: true,
      message: 'Usuario desactivado correctamente',
      data: user
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

}

export async function resetPassword(req, res) {

  try {

    const { id } = req.params;

    const result = await resetUserPassword(id);

    res.status(200).json({
      success: true,
      message: 'Contraseña reseteada correctamente',
      data: result
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

}
export async function getDocentes(req, res) {

  try {

    const docentes =
      await getDocentesService();

    res.status(200).json({
      success: true,
      data: docentes
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

}
export async function getEstudiantes(req, res) {

  try {

    const estudiantes =
      await getEstudiantesService();

    res.status(200).json({
      success: true,
      data: estudiantes
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

}