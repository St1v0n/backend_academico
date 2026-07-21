PORT=3000

# Supabase
SUPABASE_URL=https://bnstzdnooxjrrqvnfwue.supabase.co
SUPABASE_ANON_KEY=tu-anon-key-aqui
SUPABASE_SERVICE_KEY=tu-service-role-key-aqui

# Conexión directa a PostgreSQL (la que ya tienes)

# 📄 DOCUMENTACIÓN TÉCNICA DEL BACKEND

Backend desarrollado para un Sistema de Gestión Académica universitario utilizando Node.js, Express y PostgreSQL bajo una arquitectura modular escalable.

---

# 🧠 Información del Entorno

## 🔹 Runtime

| Tecnología | Versión |
|---|---|
| Node.js | v24.14.0 |
| npm | 11.9.0 |

---

# 📦 Dependencias del Proyecto

## 🔹 Dependencias de Producción

| Paquete | Versión | Descripción |
|---|---|---|
| express | 5.2.1 | Framework backend para API REST |
| pg | 8.20.0 | Driver de conexión con PostgreSQL |
| jsonwebtoken | 9.0.3 | Autenticación basada en JWT |
| bcryptjs | 3.0.3 | Hash y encriptación de contraseñas |
| cors | 2.8.6 | Control de acceso entre frontend y backend |
| dotenv | 17.4.2 | Manejo de variables de entorno |

---

## 🔹 Dependencias de Desarrollo

| Paquete | Versión | Descripción |
|---|---|---|
| nodemon | 3.1.14 | Reinicio automático del servidor |

---

# 🏗️ Arquitectura del Proyecto

El backend fue desarrollado bajo una arquitectura modular por capas:

```txt
Routes → Controllers → Services → Models → PostgreSQL
````

## 📁 Estructura de Carpetas

```txt
src/
├── config/              → Configuración de entorno y base de datos
├── middlewares/         → Middlewares de autenticación y roles
├── modules/             → Módulos funcionales del sistema
│   ├── auth/
│   ├── usuarios/
│   ├── carreras/
│   ├── materias/
│   ├── prerrequisitos/
│   ├── inscripciones/
│   ├── periodos/
│   ├── notas/
│   └── reportes/
├── utils/               → Helpers y utilidades
├── app.js               → Configuración principal de Express
└── server.js            → Punto de inicio del servidor
```

---

# 🗄️ Base de Datos

## 🔹 Motor utilizado

* PostgreSQL
* Hosting mediante Supabase

## 🔹 Conexión

* `pg Pool`

## 🔹 Modelo relacional

Tablas principales:

* usuarios
* roles
* carreras
* materias
* periodos_academicos
* inscripciones
* prerrequisitos
* notas

---

# 🔐 Seguridad

## 🔹 Autenticación

* JWT (JSON Web Token)

## 🔹 Protección de contraseñas

* Hash mediante `bcryptjs`

## 🔹 Protección de rutas

Middlewares implementados:

* `auth.middleware.js`
* `role.middleware.js`

---

# 🌐 API REST

## 🔹 Formato

* JSON

## 🔹 Base URL

```txt
http://localhost:3000
```

---

# 🚀 Scripts del Proyecto

```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
  }
}
```

---

# 📌 Tecnologías Utilizadas

| Tecnología | Versión |
| ---------- | ------- |
| Node.js    | 24.14.0 |
| npm        | 11.9.0  |
| Express    | 5.2.1   |
| PostgreSQL | 17      |
| pg         | 8.20.0  |
| JWT        | 9.0.3   |

---

# 🎯 Funcionalidades Implementadas

## 👤 Gestión de Usuarios

* CRUD de usuarios
* Roles y permisos
* Generación de credenciales
* Restablecimiento de contraseña
* Desactivación lógica

---

## 🎓 Gestión Académica

* CRUD de carreras
* CRUD de materias
* CRUD de periodos académicos
* Relación carrera → materias
* Gestión de prerrequisitos

---

## 📝 Inscripciones

Validaciones implementadas:

* Validar carrera del estudiante
* Validar periodo activo
* Validar prerrequisitos
* Bloquear duplicados
* Bloquear inscripciones inválidas

---

## 📊 Reportes

* Reporte por materia
* Historial académico del estudiante
* Historial por carrera
* Reporte por periodo

---

## 👨‍🏫 Registro de Notas

* Registro de notas finales
* Acceso exclusivo para docentes

---

# ⚙️ Características Técnicas

* Arquitectura modular escalable
* Separación por capas
* Uso de middlewares
* Validaciones centralizadas
* API RESTful
* Manejo de errores controlado
* Soft delete mediante estado lógico
* PostgreSQL como base de datos relacional

---

# 📚 Resumen del Sistema

El sistema permite administrar procesos académicos universitarios mediante una API REST segura y modular.

Funciones principales:

* Gestión de usuarios y roles
* Gestión académica
* Inscripciones inteligentes con validaciones
* Control de periodos académicos
* Registro de notas
* Generación de reportes

---

# 👨‍💻 Entorno de Desarrollo

```bash
npm install
npm run dev
```

Servidor local:

```txt
http://localhost:3000
```

---

# 🔧 Variables de Entorno

Ejemplo de `.env`

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=academic_system

JWT_SECRET=tu_secret
```

---

# ✅ Estado General del Proyecto

| Módulo         | Estado       |
| -------------- | ------------ |
| Autenticación  | ✅            |
| Usuarios       | ✅            |
| Carreras       | ✅            |
| Materias       | ✅            |
| Periodos       | ✅            |
| Prerrequisitos | ✅            |
| Inscripciones  | ✅            |
| Reportes       | ⚠️ En mejora |
| Notas          | ✅            |

---

```
```
