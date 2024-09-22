const pool = require('../config/db');

exports.getAllEstudiantes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM estudiantes');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getEstudianteById = async (req, res) => {
  const { cedula } = req.params;
  try {
    const result = await pool.query('SELECT * FROM estudiantes WHERE cedula_estudiantes = $1', [cedula]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createEstudiante = async (req, res) => {
  const { cedula_estudiantes, tipo_documento, apellido1, apellido2, nombre1, nombre2, telefono, direccion, correo, programa_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO estudiantes (cedula_estudiantes, tipo_documento, apellido1, apellido2, nombre1, nombre2, telefono, direccion, correo, programa_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [cedula_estudiantes, tipo_documento, apellido1, apellido2, nombre1, nombre2, telefono, direccion, correo, programa_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateEstudiante = async (req, res) => {
  const { cedula } = req.params;
  const { tipo_documento, apellido1, apellido2, nombre1, nombre2, telefono, direccion, correo, programa_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE estudiantes SET tipo_documento = $1, apellido1 = $2, apellido2 = $3, nombre1 = $4, nombre2 = $5, telefono = $6, direccion = $7, correo = $8, programa_id = $9 WHERE cedula_estudiantes = $10 RETURNING *',
      [tipo_documento, apellido1, apellido2, nombre1, nombre2, telefono, direccion, correo, programa_id, cedula]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteEstudiante = async (req, res) => {
  const { cedula } = req.params;
  try {
    const result = await pool.query('DELETE FROM estudiantes WHERE cedula_estudiantes = $1 RETURNING *', [cedula]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante not found' });
    }
    res.json({ message: 'Estudiante deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};