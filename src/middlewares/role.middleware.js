export function roleMiddleware(...roles) {

  return (req, res, next) => {

    // Verificar usuario
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    // Verificar rol
    if (!roles.includes(req.user.rol)) {

      return res.status(403).json({
        success: false,
        message: 'Acceso denegado'
      });

    }

    next();

  };

}