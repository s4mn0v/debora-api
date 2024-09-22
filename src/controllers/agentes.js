const pool = require('../config/db');

exports.getAllAgentes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM agentes');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAgenteById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM agentes WHERE agente_id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Agente not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createAgente = async (req, res) => {
  const { nombre_agente } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO agentes (nombre_agente) VALUES ($1) RETURNING *',
      [nombre_agente]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateAgente = async (req, res) => {
  const { id } = req.params;
  const { nombre_agente } = req.body;
  try {
    const result = await pool.query(
      'UPDATE agentes SET nombre_agente = $1 WHERE agente_id = $2 RETURNING *',
      [nombre_agente, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Agente not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteAgente = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM agentes WHERE agente_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Agente not found' });
    }
    res.json({ message: 'Agente deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};