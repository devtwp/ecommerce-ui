import { Pool } from 'pg';
import Cors from 'micro-cors';

const cors = Cors({
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  origin: '*',
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

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

export default cors(handler);
