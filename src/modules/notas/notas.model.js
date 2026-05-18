import pool from '../../config/db.js';

export async function findInscripcionById(
  inscripcionId
) {

  const query = `
    SELECT

      i.id_inscripcion,
      i.estudiante_id,
      i.materia_id,

      m.docente_id

    FROM inscripcion i

    INNER JOIN materia m
      ON i.materia_id = m.id_materia

    WHERE i.id_inscripcion = $1
  `;

  const result =
    await pool.query(query, [inscripcionId]);

  return result.rows[0];

}

export async function updateNotaFinal(
  inscripcionId,
  notaFinal
) {

  const query = `
    UPDATE inscripcion
    SET nota_final = $1
    WHERE id_inscripcion = $2
    RETURNING *
  `;

  const result =
    await pool.query(query, [
      notaFinal,
      inscripcionId
    ]);

  return result.rows[0];

}
export async function findDocenteInscripciones(
  docenteId
) {

  const query = `

    SELECT

      i.id_inscripcion,

      CONCAT(
        u.nombres,
        ' ',
        u.apellidos
      ) AS estudiante,

      m.nombre AS materia,
      m.sigla,

      p.gestion,
      p.periodo,

      i.nota_final

    FROM inscripcion i

    INNER JOIN usuario u
      ON i.estudiante_id = u.id_usuario

    INNER JOIN materia m
      ON i.materia_id = m.id_materia

    INNER JOIN periodo_academico p
      ON i.periodo_id = p.id_periodo

    WHERE m.docente_id = $1

    ORDER BY
      m.nombre ASC

  `;

  const result =
    await pool.query(query, [
      docenteId
    ]);

  return result.rows;

}