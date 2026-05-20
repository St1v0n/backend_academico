import pool from '../../config/db.js';

export async function findAllUsers() {

  const query = `
    SELECT
      u.id_usuario,
      u.nombres,
      u.apellidos,
      u.ci,
      u.correo,
      u.estado,
      r.nombre AS rol,
      c.nombre AS carrera,
      u.carrera_id,
      u.created_at
    FROM usuario u

    INNER JOIN rol r
      ON u.rol_id = r.id_rol

    LEFT JOIN carrera c
      ON u.carrera_id = c.id_carrera

    ORDER BY u.id_usuario ASC
  `;

  const result = await pool.query(query);

  return result.rows;

}

export async function findUserByEmail(correo) {

  const query = `
    SELECT *
    FROM usuario
    WHERE correo = $1
  `;

  const result = await pool.query(query, [correo]);

  return result.rows[0];

}

export async function findUserByCI(ci) {

  const query = `
    SELECT *
    FROM usuario
    WHERE ci = $1
  `;

  const result = await pool.query(query, [ci]);

  return result.rows[0];

}

export async function insertUser(user) {

  const query = `
    INSERT INTO usuario (
      nombres,
      apellidos,
      ci,
      correo,
      password,
      rol_id,
      carrera_id
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)

    RETURNING
      id_usuario,
      nombres,
      apellidos,
      ci,
      correo,
      rol_id,
      carrera_id,
      estado,
      created_at
  `;

  const values = [
    user.nombres,
    user.apellidos,
    user.ci,
    user.correo,
    user.password,
    user.rol_id,
    user.carrera_id || null
  ];

  const result = await pool.query(query, values);

  return result.rows[0];

}

export async function findUserById(id) {

  const query = `
    SELECT
      u.id_usuario,
      u.nombres,
      u.apellidos,
      u.ci,
      u.correo,
      u.estado,
      u.carrera_id,

      r.nombre AS rol,

      c.nombre AS carrera,

      u.created_at

    FROM usuario u

    INNER JOIN rol r
      ON u.rol_id = r.id_rol

    LEFT JOIN carrera c
      ON u.carrera_id = c.id_carrera

    WHERE u.id_usuario = $1
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];

}

export async function updateUserData(id, user) {

  const query = `
    UPDATE usuario

    SET
      nombres = $1,
      apellidos = $2,
      ci = $3,
      correo = $4,
      rol_id = $5,
      carrera_id = $6

    WHERE id_usuario = $7

    RETURNING
      id_usuario,
      nombres,
      apellidos,
      ci,
      correo,
      rol_id,
      carrera_id,
      estado,
      created_at
  `;

  const values = [
    user.nombres,
    user.apellidos,
    user.ci,
    user.correo,
    user.rol_id,
    user.carrera_id || null,
    id
  ];

  const result = await pool.query(query, values);

  return result.rows[0];

}

export async function disableUserData(id) {

  const query = `
    UPDATE usuario
    SET estado = false
    WHERE id_usuario = $1

    RETURNING
      id_usuario,
      nombres,
      apellidos,
      correo,
      estado
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];

}

export async function updateUserPassword(id, password) {

  const query = `
    UPDATE usuario
    SET password = $1
    WHERE id_usuario = $2
  `;

  await pool.query(query, [password, id]);

}

export async function findDocentes() {

  const query = `
    SELECT
      id_usuario,
      nombres,
      apellidos
    FROM usuario

    WHERE rol_id = 3
    AND estado = true

    ORDER BY nombres ASC
  `;

  const result = await pool.query(query);

  return result.rows;

}

export async function findEstudiantes() {

  const query = `
    SELECT
      id_usuario,
      nombres,
      apellidos
    FROM usuario

    WHERE rol_id = 2
    AND estado = true

    ORDER BY nombres ASC
  `;

  const result = await pool.query(query);

  return result.rows;

}