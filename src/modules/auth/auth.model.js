import pool from '../../config/db.js';

export async function findUserByEmail(correo) {

  const query = `
    SELECT 
      u.id_usuario,
      u.nombres,
      u.apellidos,
      u.correo,
      u.password,
      r.nombre AS rol
    FROM usuario u
    INNER JOIN rol r
      ON u.rol_id = r.id_rol
    WHERE u.correo = $1
      AND u.estado = true
  `;

  const result = await pool.query(query, [correo]);

  return result.rows[0];
}