import bcrypt from 'bcryptjs';

import {
  findAllUsers,
  findUserById,
  findUserByEmail,
  findUserByCI,
  insertUser,
  updateUserData,
  disableUserData,
  updateUserPassword,
  findDocentes,
  findEstudiantes
} from './usuarios.model.js';

export async function getAllUsers() {

  const users = await findAllUsers();

  return users;

}

export async function getOneUser(id) {

  const user = await findUserById(id);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  return user;

}

export async function createNewUser(data) {

  const {
    nombres,
    apellidos,
    ci,
    correo,
    rol_id,
    carrera_id
  } = data;

  const existingEmail =
    await findUserByEmail(correo);

  if (existingEmail) {
    throw new Error(
      'El correo ya existe'
    );
  }

  const existingCI =
    await findUserByCI(ci);

  if (existingCI) {
    throw new Error(
      'El CI ya existe'
    );
  }

  const tempPassword =
    nombres.charAt(0).toUpperCase() +
    apellidos.charAt(0).toUpperCase() +
    ci;

  const hashedPassword =
    await bcrypt.hash(
      tempPassword,
      10
    );

  const newUser =
    await insertUser({
      nombres,
      apellidos,
      ci,
      correo,
      password: hashedPassword,
      rol_id,
      carrera_id
    });

  return {
    ...newUser,
    tempPassword
  };

}

export async function updateExistingUser(id, data) {

  // Verificar existencia
  const existingUser = await findUserById(id);

  if (!existingUser) {
    throw new Error('Usuario no encontrado');
  }

  const updatedUser = await updateUserData(id, data);

  return updatedUser;

}

export async function disableExistingUser(id) {

  const existingUser = await findUserById(id);

  if (!existingUser) {
    throw new Error('Usuario no encontrado');
  }

  const disabledUser = await disableUserData(id);

  return disabledUser;

}

export async function resetUserPassword(id) {

  // Buscar usuario
  const user = await findUserById(id);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Generar password temporal
  const tempPassword =
    user.nombres.charAt(0).toUpperCase() +
    user.apellidos.charAt(0).toUpperCase() +
    user.ci;

  // Hash password
  const hashedPassword = await bcrypt.hash(
    tempPassword,
    10
  );

  // Actualizar password
  await updateUserPassword(id, hashedPassword);

  return {
    id_usuario: user.id_usuario,
    nombres: user.nombres,
    apellidos: user.apellidos,
    tempPassword
  };

}
export async function getDocentesService() {

  return await findDocentes();

}
export async function getEstudiantesService() {

  return await findEstudiantes();

}