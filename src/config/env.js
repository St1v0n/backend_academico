import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: process.env.PORT || 3000,
  
  // Supabase
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY,
  
  // Para conexión directa a PostgreSQL (opcional)
  databaseUrl: process.env.DATABASE_URL,
  
  jwtSecret: process.env.JWT_SECRET
};