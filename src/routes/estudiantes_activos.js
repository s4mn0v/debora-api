const express = require('express');
const router = express.Router();
const estudiantesActivosController = require('../controllers/estudiantes_activos');

router.get('/', estudiantesActivosController.getAllEstudiantesActivos);
router.get('/:cedula', estudiantesActivosController.getEstudianteActivoById);
router.post('/', estudiantesActivosController.createEstudianteActivo);
router.put('/:cedula', estudiantesActivosController.updateEstudianteActivo);
router.delete('/:cedula', estudiantesActivosController.deleteEstudianteActivo);

module.exports = router;