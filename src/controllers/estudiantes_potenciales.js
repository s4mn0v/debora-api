const pool = require('../config/db');

exports.getAllEstudiantesPotenciales = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM estudiantes_potenciales');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getEstudiantePotencialById = async (req, res) => {
  const { cedula } = req.params;
  try {
    const result = await pool.query('SELECT * FROM estudiantes_potenciales WHERE cedula_estudiantes_potenciales = $1', [cedula]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante potencial not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createEstudiantePotencial = async (req, res) => {
  const { cedula_estudiantes_potenciales, programa_id, agente_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO estudiantes_potenciales (cedula_estudiantes_potenciales, programa_id, agente_id) VALUES ($1, $2, $3) RETURNING *',
      [cedula_estudiantes_potenciales, programa_id, agente_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateEstudiantePotencial = async (req, res) => {
  const { cedula } = req.params;
  const { programa_id, agente_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE estudiantes_potenciales SET programa_id = $1, agente_id = $2 WHERE cedula_estudiantes_potenciales = $3 RETURNING *',
      [programa_id, agente_id, cedula]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante potencial not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteEstudiantePotencial = async (req, res) => {
  const { cedula } = req.params;
  try {
    const result = await pool.query('DELETE FROM estudiantes_potenciales WHERE cedula_estudiantes_potenciales = $1 RETURNING *', [cedula]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante potencial not found' });
    }
    res.json({ message: 'Estudiante potencial deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};