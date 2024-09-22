const pool = require('../config/db');

exports.getAllInscripciones = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inscripciones');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getInscripcionById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM inscripciones WHERE inscripcion_id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inscripcion not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createInscripcion = async (req, res) => {
  const { cedula_inscripciones, programa_id, fecha_inscripcion, jornada } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO inscripciones (cedula_inscripciones, programa_id, fecha_inscripcion, jornada) VALUES ($1, $2, $3, $4) RETURNING *',
      [cedula_inscripciones, programa_id, fecha_inscripcion, jornada]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateInscripcion = async (req, res) => {
  const { id } = req.params;
  const { cedula_inscripciones, programa_id, fecha_inscripcion, jornada } = req.body;
  try {
    const result = await pool.query(
      'UPDATE inscripciones SET cedula_inscripciones = $1, programa_id = $2, fecha_inscripcion = $3, jornada = $4 WHERE inscripcion_id = $5 RETURNING *',
      [cedula_inscripciones, programa_id, fecha_inscripcion, jornada, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inscripcion not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteInscripcion = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM inscripciones WHERE inscripcion_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inscripcion not found' });
    }
    res.json({ message: 'Inscripcion deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};