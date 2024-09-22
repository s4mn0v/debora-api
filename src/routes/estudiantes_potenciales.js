const express = require('express');
const router = express.Router();
const estudiantesPotencialesController = require('../controllers/estudiantes_potenciales');

router.get('/', estudiantesPotencialesController.getAllEstudiantesPotenciales);
router.get('/:cedula', estudiantesPotencialesController.getEstudiantePotencialById);
router.post('/', estudiantesPotencialesController.createEstudiantePotencial);
router.put('/:cedula', estudiantesPotencialesController.updateEstudiantePotencial);
router.delete('/:cedula', estudiantesPotencialesController.deleteEstudiantePotencial);

module.exports = router;