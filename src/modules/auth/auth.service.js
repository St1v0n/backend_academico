import bcrypt from 'bcryptjs';
import { findUserByEmail } from './auth.model.js';
import { generateToken } from '../../utils/jwt.js';

export async function loginUser(correo, password) {

  // Buscar usuario
  const user = await findUserByEmail(correo);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Comparar contraseña
  const validPassword = await bcrypt.compare(
    password,
    user.password
  );

  if (!validPassword) {
    throw new Error('Contraseña incorrecta');
  }

  // Generar token
  const token = generateToken({
    id: user.id_usuario,
    rol: user.rol
  });

  // Retornar datos
  return {
    token,
    user: {
      id: user.id_usuario,
      nombres: user.nombres,
      apellidos: user.apellidos,
      correo: user.correo,
      rol: user.rol
    }
  };
}