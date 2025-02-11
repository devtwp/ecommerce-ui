import { Pool } from 'pg';
import Cors from 'nextjs-cors';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Definir en Vercel
  ssl: { rejectUnauthorized: false }, // Necesario si usas PostgreSQL en la nube
});

export default async function handler(req, res) {
  await Cors(req, res, {
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    origin: ['https://lacachila-git-api-test-devtwp1-gmailcoms-projects.vercel.app', 'http://localhost:4200'],
    allowedHeaders: ['Content-Type'],
  });
  
  /*const origin = req.headers.origin;
  console.log('Origin: ' + origin);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Vary', 'Origin');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');*/
  // Manejo de preflight (CORS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo permitir GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { rows } = await pool.query('SELECT * FROM producto');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos', details: error.message });
  }
}
