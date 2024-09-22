const pool = require('../config/db');

exports.getAllInscripciones = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inscripciones');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getInscripcionById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM inscripciones WHERE inscripcion_id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inscripción no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.createInscripcion = async (req, res) => {
  const { date, nombre, nacimiento, CEDULA, sexo, telefono_celular, carrera, jornada, agente } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO inscripciones (date, nombre, nacimiento, CEDULA, sexo, telefono_celular, carrera, jornada, agente) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [date, nombre, nacimiento, CEDULA, sexo, telefono_celular, carrera, jornada, agente]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.updateInscripcion = async (req, res) => {
  const { id } = req.params;
  const { date, nombre, nacimiento, CEDULA, sexo, telefono_celular, carrera, jornada, agente } = req.body;
  try {
    const result = await pool.query(
      'UPDATE inscripciones SET date = $1, nombre = $2, nacimiento = $3, CEDULA = $4, sexo = $5, telefono_celular = $6, carrera = $7, jornada = $8, agente = $9 WHERE inscripcion_id = $10 RETURNING *',
      [date, nombre, nacimiento, CEDULA, sexo, telefono_celular, carrera, jornada, agente, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inscripción no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.deleteInscripcion = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM inscripciones WHERE inscripcion_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inscripción no encontrada' });
    }
    res.json({ message: 'Inscripción eliminada exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};