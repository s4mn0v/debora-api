const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantes');

router.get('/', estudiantesController.getAllEstudiantes);
router.get('/:cedula', estudiantesController.getEstudianteById);
router.post('/', estudiantesController.createEstudiante);
router.put('/:cedula', estudiantesController.updateEstudiante);
router.delete('/:cedula', estudiantesController.deleteEstudiante);

module.exports = router;