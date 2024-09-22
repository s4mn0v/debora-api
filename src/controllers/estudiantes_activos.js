const pool = require('../config/db');

exports.getAllEstudiantesActivos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM estudiantes_activos');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getEstudianteActivoById = async (req, res) => {
  const { cedula } = req.params;
  try {
    const result = await pool.query('SELECT * FROM estudiantes_activos WHERE cedula_estudiantes_activos = $1', [cedula]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante activo not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createEstudianteActivo = async (req, res) => {
  const { cedula_estudiantes_activos, apellido1, apellido2, nombre1, nombre2, telefono, estado_u, jornada, sheetname, filename } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO estudiantes_activos (cedula_estudiantes_activos, apellido1, apellido2, nombre1, nombre2, telefono, estado_u, jornada, sheetname, filename) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [cedula_estudiantes_activos, apellido1, apellido2, nombre1, nombre2, telefono, estado_u, jornada, sheetname, filename]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateEstudianteActivo = async (req, res) => {
  const { cedula } = req.params;
  const { apellido1, apellido2, nombre1, nombre2, telefono, estado_u, jornada, sheetname, filename } = req.body;
  try {
    const result = await pool.query(
      'UPDATE estudiantes_activos SET apellido1 = $1, apellido2 = $2, nombre1 = $3, nombre2 = $4, telefono = $5, estado_u = $6, jornada = $7, sheetname = $8, filename = $9 WHERE cedula_estudiantes_activos = $10 RETURNING *',
      [apellido1, apellido2, nombre1, nombre2, telefono, estado_u, jornada, sheetname, filename, cedula]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante activo not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteEstudianteActivo = async (req, res) => {
  const { cedula } = req.params;
  try {
    const result = await pool.query('DELETE FROM estudiantes_activos WHERE cedula_estudiantes_activos = $1 RETURNING *', [cedula]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante activo not found' });
    }
    res.json({ message: 'Estudiante activo deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};