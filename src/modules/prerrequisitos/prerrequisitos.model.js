import pool from '../../config/db.js';

export async function findAllPrerrequisitos() {

  const query = `
    SELECT
      p.id_prerrequisito,

      m.id_materia,
      m.nombre AS materia,
      m.sigla,

      mp.id_materia AS prerrequisito_id,
      mp.nombre AS prerrequisito,
      mp.sigla AS prerrequisito_sigla

    FROM prerrequisito p

    INNER JOIN materia m
      ON p.materia_id = m.id_materia

    INNER JOIN materia mp
      ON p.materia_prerrequisito_id = mp.id_materia

    ORDER BY m.nombre ASC
  `;

  const result = await pool.query(query);

  return result.rows;

}

export async function findPrerrequisitoByIds(
  materiaId,
  prerrequisitoId
) {

  const query = `
    SELECT *
    FROM prerrequisito
    WHERE materia_id = $1
    AND materia_prerrequisito_id = $2
  `;

  const result = await pool.query(query, [
    materiaId,
    prerrequisitoId
  ]);

  return result.rows[0];

}

export async function insertPrerrequisito(
  materiaId,
  prerrequisitoId
) {

  const query = `
    INSERT INTO prerrequisito(
      materia_id,
      materia_prerrequisito_id
    )
    VALUES($1, $2)
    RETURNING *
  `;

  const result = await pool.query(query, [
    materiaId,
    prerrequisitoId
  ]);

  return result.rows[0];

}

export async function deletePrerrequisitoData(id) {

  const query = `
    DELETE FROM prerrequisito
    WHERE id_prerrequisito = $1
    RETURNING *
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];

}