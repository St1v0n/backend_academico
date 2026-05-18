# `backend_documento.md`

````md
# BACKEND API — SISTEMA DE GESTIÓN ACADÉMICA

## Descripción General

Backend desarrollado para un Sistema de Gestión Académica universitario.

Arquitectura utilizada:

Routes → Controllers → Services → Models → PostgreSQL

Módulos implementados:

- Autenticación
- Usuarios
- Roles
- Carreras
- Periodos académicos
- Materias
- Prerrequisitos
- Inscripciones
- Reportes
- Notas

---

# AUTENTICACIÓN

## LOGIN

### Endpoint
POST `http://localhost:3000/api/auth/login`

### Body
```json
{
  "correo": "maria.gonzales@uni.edu",
  "password": "MG1234567"
}
````

### Funcionalidades implementadas

* [x] CRUD usuarios
* [x] Generar credenciales
* [x] Roles
* [x] Validaciones
* [x] Reset contraseña

---

# USUARIOS

## LISTAR USUARIOS

### Endpoint

GET `http://localhost:3000/api/usuarios`

---

## CREAR USUARIO

### Endpoint

POST `http://localhost:3000/api/usuarios`

### Body

```json
{
  "nombres": "Pedro",
  "apellidos": "Lopez",
  "ci": "4567890",
  "correo": "pedro.lopez@uni.edu",
  "rol_id": 2
}
```

---

## OBTENER USUARIO POR ID

### Endpoint

GET `http://localhost:3000/api/usuarios/1`

---

## ACTUALIZAR USUARIO

### Endpoint

PUT `http://localhost:3000/api/usuarios/4`

### Body

```json
{
  "nombres": "Pedro",
  "apellidos": "Lopez Flores",
  "ci": "4567890",
  "correo": "pedro.lopez@uni.edu",
  "rol_id": 3
}
```

---

## DESACTIVAR USUARIO

### Endpoint

PATCH `http://localhost:3000/api/usuarios/4/status`

---

## RESTABLECER CONTRASEÑA

### Endpoint

PATCH `http://localhost:3000/api/usuarios/1/reset-password`

---

# MÓDULO ACADÉMICO — MELGAR

## Estado de avance

* [ ] CRUD carreras
* [ ] CRUD periodos
* [ ] CRUD materias
* [ ] Relaciones BD
* [ ] Prerrequisitos

### Restricción

Todos los endpoints académicos requieren:

* Token de SECRETARIA

---

# CRUD CARRERAS

## OBTENER TODAS LAS CARRERAS

### Endpoint

GET `/api/carreras`

---

## OBTENER CARRERA POR ID

### Endpoint

GET `/api/carreras/1`

---

## CREAR CARRERA

### Endpoint

POST `/api/carreras`

### Body

```json
{
  "nombre": "Medicina"
}
```

---

## ACTUALIZAR CARRERA

### Endpoint

PUT `/api/carreras/5`

### Body

```json
{
  "nombre": "Medicina General"
}
```

---

## DESACTIVAR CARRERA

### Endpoint

PATCH `/api/carreras/5/status`

---

# CRUD PERIODOS ACADÉMICOS

## OBTENER TODOS LOS PERIODOS

### Endpoint

GET `/api/periodos`

---

## CREAR PERIODO

### Endpoint

POST `/api/periodos`

### Body

```json
{
  "gestion": 2026,
  "periodo": 2,
  "fecha_inicio": "2026-08-01",
  "fecha_fin": "2026-12-20",
  "activo": true
}
```

---

## ACTIVAR PERIODO

### Endpoint

PATCH `/api/periodos/1/activate`

---

# CRUD MATERIAS

## CREAR MATERIA

### Endpoint

POST `/api/materias`

### Body

```json
{
  "nombre": "Base de Datos I",
  "sigla": "SIS-301",
  "semestre": 3,
  "carrera_id": 1,
  "docente_id": 3
}
```

---

## OBTENER TODAS LAS MATERIAS

### Endpoint

GET `/api/materias`

---

## ACTUALIZAR MATERIA

### Endpoint

PUT `/api/materias/1`

### Body

```json
{
  "nombre": "Base de Datos I",
  "sigla": "SIS-301",
  "semestre": 3,
  "carrera_id": 1,
  "docente_id": 3
}
```

---

## DESACTIVAR MATERIA

### Endpoint

PATCH `/api/materias/1/status`

---

# PRERREQUISITOS

## CREAR PRERREQUISITO

### Endpoint

POST `http://localhost:3000/api/prerrequisitos`

### Body

```json
{
  "materia_id": 13,
  "materia_prerrequisito_id": 7
}
```

---

## OBTENER TODOS LOS PRERREQUISITOS

### Endpoint

GET `http://localhost:3000/api/prerrequisitos`

---

## VALIDACIÓN DE ERROR

### Caso inválido

Una materia no puede ser prerrequisito de sí misma.

### Respuesta esperada

```json
{
  "success": false,
  "message": "Una materia no puede ser prerrequisito de sí misma"
}
```

---

# INSCRIPCIONES

## Funcionalidades implementadas

* [x] Endpoint inscripción
* [x] Validar carrera
* [x] Validar periodo activo
* [x] Validar prerrequisitos
* [x] Bloquear inscripción inválida

---

## Restricciones

### Roles permitidos

* SECRETARIA
* ESTUDIANTE

### Reglas

* SECRETARIA puede inscribir cualquier estudiante.
* ESTUDIANTE solo puede inscribirse a sí mismo.

---

## INSCRIPCIÓN POR SECRETARIA

### Endpoint

POST `http://localhost:3000/api/inscripciones`

### Body

```json
{
  "estudiante_id": 53,
  "materia_id": 1
}
```

---

## INSCRIPCIÓN POR ESTUDIANTE

### Endpoint

POST `http://localhost:3000/api/inscripciones`

### Body

```json
{
  "materia_id": 1
}
```

---

# FLUJO DE PRUEBAS

## 1. LOGIN ESTUDIANTE

### Endpoint

POST `/api/auth/login`

### Body

```json
{
  "correo": "juan.perez@uni.edu",
  "password": "TU_PASSWORD"
}
```

### Headers

```txt
Authorization: Bearer TU_TOKEN
```

---

## 2. INSCRIPCIÓN EXITOSA

### Endpoint

POST `/api/inscripciones`

### Body

```json
{
  "materia_id": 1
}
```

---

## 3. BLOQUEAR INSCRIPCIÓN DUPLICADA

Realizar nuevamente el mismo request.

### Body

```json
{
  "materia_id": 1
}
```

---

## 4. VALIDAR PRERREQUISITOS

### Caso

Base de Datos II requiere Base de Datos I.

El estudiante NO aprobó Base de Datos I.

### Request

POST `/api/inscripciones`

### Body

```json
{
  "materia_id": 2
}
```

---

## 5. BLOQUEAR MATERIA DE OTRA CARRERA

### Request

```json
{
  "materia_id": 3
}
```

### Resultado esperado

```json
{
  "success": false,
  "message": "La materia no pertenece a la carrera del estudiante"
}
```

---

## 6. VALIDAR PERIODO ACTIVO

### Objetivo

Validar:

* [x] Validar periodo activo

### En PostgreSQL

```sql
UPDATE periodo_academico
SET activo = false;
```

### Intentar nuevamente inscripción

```json
{
  "materia_id": 1
}
```

### Resultado esperado

```json
{
  "success": false,
  "message": "No existe un periodo activo"
}
```

---

# REPORTES

## Estado de avance

* [ ] Endpoint reporte inscritos
* [ ] Optimizar consultas
* [ ] Corregir errores
* [ ] Validaciones finales

---

## REPORTE POR MATERIA

### Endpoint

GET `http://localhost:3000/api/reportes/materia/1`

---

## HISTORIAL POR ESTUDIANTE

### Endpoint

GET `http://localhost:3000/api/reportes/historial/2`

---

## HISTORIAL DE ESTUDIANTES POR CARRERA

### Endpoint

GET `http://localhost:3000/api/reportes/carrera/1`

---

## REPORTE POR PERIODO

### Endpoint

GET `http://localhost:3000/api/reportes/periodo/1`

---

# DOCENTES — REGISTRO DE NOTAS

## Restricción

Solo accesible con token de DOCENTE.

---

## REGISTRAR NOTA FINAL

### Endpoint

PUT `http://localhost:3000/api/notas/ID_ESTUDIANTE_INSCRIPTO`

### Body

```json
{
  "nota_final": 780
}
```

---

# OBSERVACIONES

* Todos los endpoints protegidos requieren token JWT.
* Las validaciones de negocio se realizan en Services.
* PostgreSQL utilizado como motor principal de base de datos.
* Arquitectura modular escalable.
* Manejo de activación/desactivación lógica mediante endpoints PATCH.

```
```
