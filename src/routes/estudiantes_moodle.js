const express = require('express');
const router = express.Router();
const estudiantesMoodleController = require('../controllers/estudiantes_moodle');

router.get('/', estudiantesMoodleController.getAllEstudiantesMoodle);
router.get('/:cedula', estudiantesMoodleController.getEstudianteMoodleById);
router.post('/', estudiantesMoodleController.createEstudianteMoodle);
router.put('/:cedula', estudiantesMoodleController.updateEstudianteMoodle);
router.delete('/:cedula', estudiantesMoodleController.deleteEstudianteMoodle);

module.exports = router;