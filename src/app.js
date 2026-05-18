import express from 'express';
import cors from 'cors';

import authRoutes from './modules/auth/auth.routes.js';
import usuariosRoutes from './modules/usuarios/usuarios.routes.js';
import carrerasRoutes from './modules/carreras/carreras.routes.js';
import periodosRoutes from './modules/periodos/periodos.routes.js';
import materiasRoutes from './modules/materias/materias.routes.js';
import prerrequisitosRoutes from './modules/prerrequisitos/prerrequisitos.routes.js';
import inscripcionesRoutes from './modules/inscripciones/inscripciones.routes.js';
import reportesRoutes from './modules/reportes/reportes.routes.js';
import notasRoutes from './modules/notas/notas.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Backend funcionando correctamente'
  });
});

// Rutas auth
app.use('/api/auth', authRoutes);

// Usuarios
app.use('/api/usuarios', usuariosRoutes);

//Carreras
app.use('/api/carreras', carrerasRoutes);

//Periodos
app.use('/api/periodos', periodosRoutes);

//Materias
app.use('/api/materias', materiasRoutes);

//Prerrequisitos
app.use('/api/prerrequisitos', prerrequisitosRoutes);

//Inscripciones
app.use('/api/inscripciones', inscripcionesRoutes);

//Reportes
app.use('/api/reportes', reportesRoutes);

//Docentes
app.use('/api/notas', notasRoutes);

export default app;