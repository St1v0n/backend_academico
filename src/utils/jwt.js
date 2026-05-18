// src/utils/jwt.js
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function generateToken(payload) {
  if (!env.jwtSecret) {
    throw new Error("JWT_SECRET no está definido en .env");
  }
  return jwt.sign(payload, env.jwtSecret, { expiresIn: '8h' });
}

export function verifyToken(token) {
  if (!env.jwtSecret) {
    throw new Error("JWT_SECRET no está definido en .env");
  }
  return jwt.verify(token, env.jwtSecret);
}
