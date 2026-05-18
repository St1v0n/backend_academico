import pool from '../../config/db.js';

export async function findAllCarreras() {

  const query = `
    SELECT
      id_carrera,
      nombre,
      estado
    FROM carrera
    ORDER BY id_carrera ASC
  `;

  const result = await pool.query(query);

  return result.rows;

}

export async function findCarreraById(id) {

  const query = `
    SELECT
      id_carrera,
      nombre,
      estado
    FROM carrera
    WHERE id_carrera = $1
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];

}

export async function findCarreraByName(nombre) {

  const query = `
    SELECT *
    FROM carrera
    WHERE nombre = $1
  `;

  const result = await pool.query(query, [nombre]);

  return result.rows[0];

}

export async function insertCarrera(nombre) {

  const query = `
    INSERT INTO carrera(nombre)
    VALUES($1)
    RETURNING
      id_carrera,
      nombre,
      estado
  `;

  const result = await pool.query(query, [nombre]);

  return result.rows[0];

}

export async function updateCarreraData(id, nombre) {

  const query = `
    UPDATE carrera
    SET nombre = $1
    WHERE id_carrera = $2
    RETURNING
      id_carrera,
      nombre,
      estado
  `;

  const result = await pool.query(query, [
    nombre,
    id
  ]);

  return result.rows[0];

}

export async function disableCarreraData(id) {

  const query = `
    UPDATE carrera
    SET estado = false
    WHERE id_carrera = $1
    RETURNING
      id_carrera,
      nombre,
      estado
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];

}