import app from './app.js';
import './config/db.js';
import { env } from './config/env.js';

const PORT = env.port || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
});