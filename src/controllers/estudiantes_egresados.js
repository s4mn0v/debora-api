const pool = require('../config/db');

exports.getAllEstudiantesEgresados = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM estudiantes_egresados');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getEstudianteEgresadoById = async (req, res) => {
  const { cedula } = req.params;
  try {
    const result = await pool.query('SELECT * FROM estudiantes_egresados WHERE cedula_estudiantes_egresados = $1', [cedula]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante egresado not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createEstudianteEgresado = async (req, res) => {
  const { cedula_estudiantes_egresados, acta_grado_no, libro_grado_no, folio_no, titulo, dia_graduacion, snies_programa } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO estudiantes_egresados (cedula_estudiantes_egresados, acta_grado_no, libro_grado_no, folio_no, titulo, dia_graduacion, snies_programa) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [cedula_estudiantes_egresados, acta_grado_no, libro_grado_no, folio_no, titulo, dia_graduacion, snies_programa]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateEstudianteEgresado = async (req, res) => {
  const { cedula } = req.params;
  const { acta_grado_no, libro_grado_no, folio_no, titulo, dia_graduacion, snies_programa } = req.body;
  try {
    const result = await pool.query(
      'UPDATE estudiantes_egresados SET acta_grado_no = $1, libro_grado_no = $2, folio_no = $3, titulo = $4, dia_graduacion = $5, snies_programa = $6 WHERE cedula_estudiantes_egresados = $7 RETURNING *',
      [acta_grado_no, libro_grado_no, folio_no, titulo, dia_graduacion, snies_programa, cedula]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante egresado not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteEstudianteEgresado = async (req, res) => {
  const { cedula } = req.params;
  try {
    const result = await pool.query('DELETE FROM estudiantes_egresados WHERE cedula_estudiantes_egresados = $1 RETURNING *', [cedula]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante egresado not found' });
    }
    res.json({ message: 'Estudiante egresado deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};