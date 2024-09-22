const express = require('express');
const router = express.Router();
const estudiantesEgresadosController = require('../controllers/estudiantes_egresados');

router.get('/', estudiantesEgresadosController.getAllEstudiantesEgresados);
router.get('/:cedula', estudiantesEgresadosController.getEstudianteEgresadoById);
router.post('/', estudiantesEgresadosController.createEstudianteEgresado);
router.put('/:cedula', estudiantesEgresadosController.updateEstudianteEgresado);
router.delete('/:cedula', estudiantesEgresadosController.deleteEstudianteEgresado);

module.exports = router;    