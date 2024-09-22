const pool = require('../config/db');

exports.getAllProgramas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM programas');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getProgramaById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM programas WHERE programa_id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Programa no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.createPrograma = async (req, res) => {
  const { nombre_programa, snies_programa } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO programas (nombre_programa, snies_programa) VALUES ($1, $2) RETURNING *',
      [nombre_programa, snies_programa]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.updatePrograma = async (req, res) => {
  const { id } = req.params;
  const { nombre_programa, snies_programa } = req.body;
  try {
    const result = await pool.query(
      'UPDATE programas SET nombre_programa = $1, snies_programa = $2 WHERE programa_id = $3 RETURNING *',
      [nombre_programa, snies_programa, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Programa no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.deletePrograma = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM programas WHERE programa_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Programa no encontrado' });
    }
    res.json({ message: 'Programa eliminado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};