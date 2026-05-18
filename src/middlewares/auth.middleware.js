import { verifyToken } from '../utils/jwt.js';

export function authMiddleware(req, res, next) {

  try {

    // Obtener header
    const authHeader = req.headers.authorization;

    // Validar existencia
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Token requerido'
      });
    }

    // Formato Bearer TOKEN
    const token = authHeader.split(' ')[1];

    // Verificar token
    const decoded = verifyToken(token);

    // Guardar usuario en request
    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: 'Token inválido'
    });

  }

}