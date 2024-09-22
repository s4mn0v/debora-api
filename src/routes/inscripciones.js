const express = require('express');
const router = express.Router();
const inscripcionesController = require('../controllers/inscripciones');

// Obtener todas las inscripciones
router.get('/', inscripcionesController.getAllInscripciones);

// Obtener una inscripción por ID
router.get('/:id', inscripcionesController.getInscripcionById);

// Crear una nueva inscripción
router.post('/', inscripcionesController.createInscripcion);

// Actualizar una inscripción existente
router.put('/:id', inscripcionesController.updateInscripcion);

// Eliminar una inscripción
router.delete('/:id', inscripcionesController.deleteInscripcion);

module.exports = router;