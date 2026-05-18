import pool from '../../config/db.js';

export async function findAllPeriodos() {

  const query = `
    SELECT
      id_periodo,
      gestion,
      periodo,
      fecha_inicio,
      fecha_fin,
      activo
    FROM periodo_academico
    ORDER BY gestion DESC, periodo DESC
  `;

  const result = await pool.query(query);

  return result.rows;

}

export async function findPeriodoById(id) {

  const query = `
    SELECT
      id_periodo,
      gestion,
      periodo,
      fecha_inicio,
      fecha_fin,
      activo
    FROM periodo_academico
    WHERE id_periodo = $1
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];

}

export async function findPeriodoByGestionPeriodo(
  gestion,
  periodo
) {

  const query = `
    SELECT *
    FROM periodo_academico
    WHERE gestion = $1
    AND periodo = $2
  `;

  const result = await pool.query(query, [
    gestion,
    periodo
  ]);

  return result.rows[0];

}

export async function insertPeriodo(data) {

  const query = `
    INSERT INTO periodo_academico(
      gestion,
      periodo,
      fecha_inicio,
      fecha_fin,
      activo
    )
    VALUES($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const values = [
    data.gestion,
    data.periodo,
    data.fecha_inicio,
    data.fecha_fin,
    data.activo
  ];

  const result = await pool.query(query, values);

  return result.rows[0];

}

export async function updatePeriodoData(
  id,
  data
) {

  const query = `
    UPDATE periodo_academico
    SET
      gestion = $1,
      periodo = $2,
      fecha_inicio = $3,
      fecha_fin = $4
    WHERE id_periodo = $5
    RETURNING *
  `;

  const values = [
    data.gestion,
    data.periodo,
    data.fecha_inicio,
    data.fecha_fin,
    id
  ];

  const result = await pool.query(query, values);

  return result.rows[0];

}

export async function disableAllPeriodos() {

  const query = `
    UPDATE periodo_academico
    SET activo = false
  `;

  await pool.query(query);

}

export async function activatePeriodo(id) {

  const query = `
    UPDATE periodo_academico
    SET activo = true
    WHERE id_periodo = $1
    RETURNING *
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];

}