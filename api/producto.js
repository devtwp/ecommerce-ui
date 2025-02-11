import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Definir en Vercel
  ssl: { rejectUnauthorized: false }, // Necesario si usas PostgreSQL en la nube
});

export default async function handler(req, res) {
  const allowedOrigins = [
    'https://lacachila-git-api-test-devtwp1-gmailcoms-projects.vercel.app',
    'http://localhost:4200'
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    console.log('Origin: ' +origin);
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
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
