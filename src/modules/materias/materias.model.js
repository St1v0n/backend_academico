import pool from '../../config/db.js';

export async function findAllMaterias() {

  const query = `
    SELECT
      m.id_materia,
      m.nombre,
      m.sigla,
      m.semestre,
      m.estado,

      c.id_carrera,
      c.nombre AS carrera,

      u.id_usuario AS docente_id,
      CONCAT(
        u.nombres,
        ' ',
        u.apellidos
      ) AS docente

    FROM materia m

    INNER JOIN carrera c
      ON m.carrera_id = c.id_carrera

    LEFT JOIN usuario u
      ON m.docente_id = u.id_usuario

    ORDER BY m.semestre ASC
  `;

  const result = await pool.query(query);

  return result.rows;

}

export async function findMateriaById(id) {

  const query = `
    SELECT
      m.id_materia,
      m.nombre,
      m.sigla,
      m.semestre,
      m.estado,

      c.id_carrera,
      c.nombre AS carrera,

      u.id_usuario AS docente_id,
      CONCAT(
        u.nombres,
        ' ',
        u.apellidos
      ) AS docente

    FROM materia m

    INNER JOIN carrera c
      ON m.carrera_id = c.id_carrera

    LEFT JOIN usuario u
      ON m.docente_id = u.id_usuario

    WHERE m.id_materia = $1
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];

}

export async function findMateriaBySigla(sigla) {

  const query = `
    SELECT *
    FROM materia
    WHERE sigla = $1
  `;

  const result = await pool.query(query, [sigla]);

  return result.rows[0];

}

export async function findMateriaBySiglaExceptId(sigla, id) {

  const query = `
    SELECT *
    FROM materia
    WHERE sigla = $1
    AND id_materia != $2
  `;

  const result = await pool.query(query, [
    sigla,
    id
  ]);

  return result.rows[0];

}

export async function insertMateria(data) {

  const query = `
    INSERT INTO materia(
      nombre,
      sigla,
      semestre,
      carrera_id,
      docente_id
    )
    VALUES($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const values = [
    data.nombre,
    data.sigla,
    data.semestre,
    data.carrera_id,
    data.docente_id || null
  ];

  const result = await pool.query(query, values);

  return result.rows[0];

}

export async function updateMateriaData(
  id,
  data
) {

  const query = `
    UPDATE materia
    SET
      nombre = $1,
      sigla = $2,
      semestre = $3,
      carrera_id = $4,
      docente_id = $5
    WHERE id_materia = $6
    RETURNING *
  `;

  const values = [
    data.nombre,
    data.sigla,
    data.semestre,
    data.carrera_id,
    data.docente_id || null,
    id
  ];

  const result = await pool.query(query, values);

  return result.rows[0];

}

export async function disableMateriaData(id) {

  const query = `
    UPDATE materia
    SET estado = false
    WHERE id_materia = $1
    RETURNING *
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];

}