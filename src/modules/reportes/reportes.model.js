import pool from '../../config/db.js';

export async function getInscritosByMateria(
  search
) {

  const query = `
    SELECT

      m.id_materia,
      m.nombre AS materia,
      m.sigla,

      CONCAT(
        u.nombres,
        ' ',
        u.apellidos
      ) AS estudiante,

      u.correo,

      p.gestion,
      p.periodo,

      i.estado,
      i.nota_final

    FROM inscripcion i

    INNER JOIN usuario u
      ON i.estudiante_id = u.id_usuario

    INNER JOIN materia m
      ON i.materia_id = m.id_materia

    INNER JOIN periodo_academico p
      ON i.periodo_id = p.id_periodo

    WHERE
      LOWER(m.nombre) LIKE LOWER($1)
      OR LOWER(m.sigla) LIKE LOWER($1)

    ORDER BY
      u.apellidos ASC
  `;

  const result =
    await pool.query(query, [`%${search}%`]);

  return result.rows;

}

export async function getHistorialEstudiante(
  search
) {

  const query = `
    SELECT

      u.id_usuario,

      CONCAT(
        u.nombres,
        ' ',
        u.apellidos
      ) AS estudiante,

      m.nombre AS materia,
      m.sigla,
      m.semestre,

      c.nombre AS carrera,

      p.gestion,
      p.periodo,

      i.estado,
      i.nota_final,

      CASE

        WHEN i.nota_final >= 51
          THEN 'APROBADO'

        WHEN i.nota_final < 51
          THEN 'REPROBADO'

        ELSE 'CURSANDO'

      END AS resultado

    FROM inscripcion i

    INNER JOIN usuario u
      ON i.estudiante_id = u.id_usuario

    INNER JOIN materia m
      ON i.materia_id = m.id_materia

    INNER JOIN carrera c
      ON m.carrera_id = c.id_carrera

    INNER JOIN periodo_academico p
      ON i.periodo_id = p.id_periodo

    WHERE
      LOWER(
        CONCAT(
          u.nombres,
          ' ',
          u.apellidos
        )
      )
      LIKE LOWER($1)

    ORDER BY
      p.gestion ASC,
      p.periodo ASC,
      m.semestre ASC
  `;

  const result =
    await pool.query(query, [
      `%${search}%`
    ]);

  return result.rows;

}

export async function getInscritosByCarrera(
  carreraId
) {

  const query = `
    SELECT

      c.id_carrera,
      c.nombre AS carrera,

      m.nombre AS materia,
      m.sigla,

      CONCAT(
        u.nombres,
        ' ',
        u.apellidos
      ) AS estudiante,

      p.gestion,
      p.periodo,

      i.estado,
      i.nota_final

    FROM inscripcion i

    INNER JOIN usuario u
      ON i.estudiante_id = u.id_usuario

    INNER JOIN materia m
      ON i.materia_id = m.id_materia

    INNER JOIN carrera c
      ON m.carrera_id = c.id_carrera

    INNER JOIN periodo_academico p
      ON i.periodo_id = p.id_periodo

    WHERE c.id_carrera = $1

    ORDER BY
      m.semestre ASC,
      u.apellidos ASC
  `;

  const result =
    await pool.query(query, [carreraId]);

  return result.rows;

}

export async function getInscritosByPeriodo(
  periodoId
) {

  const query = `
    SELECT

      p.gestion,
      p.periodo,

      c.nombre AS carrera,

      m.nombre AS materia,
      m.sigla,

      CONCAT(
        u.nombres,
        ' ',
        u.apellidos
      ) AS estudiante,

      i.estado,
      i.nota_final

    FROM inscripcion i

    INNER JOIN usuario u
      ON i.estudiante_id = u.id_usuario

    INNER JOIN materia m
      ON i.materia_id = m.id_materia

    INNER JOIN carrera c
      ON m.carrera_id = c.id_carrera

    INNER JOIN periodo_academico p
      ON i.periodo_id = p.id_periodo

    WHERE p.id_periodo = $1

    ORDER BY
      c.nombre ASC,
      m.semestre ASC,
      estudiante ASC
  `;

  const result =
    await pool.query(query, [periodoId]);

  return result.rows;

}

export async function getMateriasDocente(
  docenteId
) {

  const query = `
    SELECT

      u.id_usuario,

      CONCAT(
        u.nombres,
        ' ',
        u.apellidos
      ) AS docente,

      m.id_materia,
      m.nombre AS materia,
      m.sigla,
      m.semestre,

      c.nombre AS carrera

    FROM materia m

    INNER JOIN usuario u
      ON m.docente_id = u.id_usuario

    INNER JOIN carrera c
      ON m.carrera_id = c.id_carrera

    WHERE u.id_usuario = $1

    ORDER BY
      m.semestre ASC
  `;

  const result =
    await pool.query(query, [docenteId]);

  return result.rows;

}