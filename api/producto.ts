import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();
import { Producto } from '../src/assets/dto/Producto';

dotenv.config();

const pool = new Pool({
  connectionString: process.env['DATABASE_URL'], 
  ssl: { rejectUnauthorized: false },
});

/*
// Función para agregar los encabezados CORS
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Cambia este valor por el dominio permitido
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
*/

export default async function handler(res:any) {
  try {
    const rows = await pool.query<Producto[]>('SELECT * FROM producto');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
}