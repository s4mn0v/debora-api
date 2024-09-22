const pool = require('../config/db');

exports.getAllEstudiantesMoodle = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM estudiantes_moodle');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getEstudianteMoodleById = async (req, res) => {
  const { cedula } = req.params;
  try {
    const result = await pool.query('SELECT * FROM estudiantes_moodle WHERE cedula_estudiantes_moodle = $1', [cedula]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante Moodle not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createEstudianteMoodle = async (req, res) => {
  const { cedula_estudiantes_moodle, programa_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO estudiantes_moodle (cedula_estudiantes_moodle, programa_id) VALUES ($1, $2) RETURNING *',
      [cedula_estudiantes_moodle, programa_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateEstudianteMoodle = async (req, res) => {
  const { cedula } = req.params;
  const { programa_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE estudiantes_moodle SET programa_id = $1 WHERE cedula_estudiantes_moodle = $2 RETURNING *',
      [programa_id, cedula]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante Moodle not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteEstudianteMoodle = async (req, res) => {
  const { cedula } = req.params;
  try {
    const result = await pool.query('DELETE FROM estudiantes_moodle WHERE cedula_estudiantes_moodle = $1 RETURNING *', [cedula]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante Moodle not found' });
    }
    res.json({ message: 'Estudiante Moodle deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};