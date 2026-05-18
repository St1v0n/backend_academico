import pool from '../../config/db.js';

export async function findActivePeriodo() {

  const query = `
    SELECT *
    FROM periodo_academico
    WHERE activo = true
    LIMIT 1
  `;

  const result = await pool.query(query);

  return result.rows[0];

}

export async function findStudentById(id) {

  const query = `
    SELECT
      u.id_usuario,
      u.nombres,
      u.apellidos,
      u.carrera_id,

      r.nombre AS rol

    FROM usuario u

    INNER JOIN rol r
      ON u.rol_id = r.id_rol

    WHERE u.id_usuario = $1
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];

}

export async function findMateriaById(id) {

  const query = `
    SELECT *
    FROM materia
    WHERE id_materia = $1
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];

}

export async function findDuplicateInscripcion(
  estudianteId,
  materiaId,
  periodoId
) {

  const query = `
    SELECT *
    FROM inscripcion
    WHERE estudiante_id = $1
    AND materia_id = $2
    AND periodo_id = $3
  `;

  const result = await pool.query(query, [
    estudianteId,
    materiaId,
    periodoId
  ]);

  return result.rows[0];

}

export async function findPrerrequisitos(
  materiaId
) {

  const query = `
    SELECT
      materia_prerrequisito_id
    FROM prerrequisito
    WHERE materia_id = $1
  `;

  const result = await pool.query(query, [materiaId]);

  return result.rows;

}

export async function validateApprovedPrerrequisito(
  estudianteId,
  materiaId
) {

  const query = `
    SELECT *
    FROM inscripcion
    WHERE estudiante_id = $1
    AND materia_id = $2
    AND nota_final >= 51
  `;

  const result = await pool.query(query, [
    estudianteId,
    materiaId
  ]);

  return result.rows[0];

}

export async function insertInscripcion(
  estudianteId,
  materiaId,
  periodoId
) {

  const query = `
    INSERT INTO inscripcion(
      estudiante_id,
      materia_id,
      periodo_id
    )
    VALUES($1, $2, $3)
    RETURNING *
  `;

  const result = await pool.query(query, [
    estudianteId,
    materiaId,
    periodoId
  ]);

  return result.rows[0];

}
export async function findAllInscripciones() {

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

      c.nombre AS carrera,

      CONCAT(
        d.nombres,
        ' ',
        d.apellidos
      ) AS docente,

      p.gestion,
      p.periodo,

      i.nota_final,
      i.estado

    FROM inscripcion i

    INNER JOIN usuario u
      ON i.estudiante_id = u.id_usuario

    INNER JOIN materia m
      ON i.materia_id = m.id_materia

    INNER JOIN carrera c
      ON m.carrera_id = c.id_carrera

    LEFT JOIN usuario d
      ON m.docente_id = d.id_usuario

    INNER JOIN periodo_academico p
      ON i.periodo_id = p.id_periodo

    ORDER BY i.id_inscripcion DESC

  `;

  const result =
    await pool.query(query);

  return result.rows;

}
export async function findHistorialByStudent(
  estudianteId
) {

  const query = `

    SELECT

      i.id_inscripcion,

      m.nombre AS materia,
      m.sigla,
      m.semestre,

      c.nombre AS carrera,

      p.gestion,
      p.periodo,

      i.nota_final,

      CASE

        WHEN i.nota_final >= 51
        THEN 'APROBADO'

        WHEN i.nota_final < 51
        AND i.nota_final IS NOT NULL
        THEN 'REPROBADO'

        ELSE 'PENDIENTE'

      END AS estado_academico

    FROM inscripcion i

    INNER JOIN materia m
      ON i.materia_id = m.id_materia

    INNER JOIN carrera c
      ON m.carrera_id = c.id_carrera

    INNER JOIN periodo_academico p
      ON i.periodo_id = p.id_periodo

    WHERE i.estudiante_id = $1

    ORDER BY
      p.gestion ASC,
      p.periodo ASC

  `;

  const result =
    await pool.query(query, [
      estudianteId
    ]);

  return result.rows;

}