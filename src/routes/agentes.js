const express = require('express');
const router = express.Router();
const agentesController = require('../controllers/agentes');

router.get('/', agentesController.getAllAgentes);
router.get('/:id', agentesController.getAgenteById);
router.post('/', agentesController.createAgente);
router.put('/:id', agentesController.updateAgente);
router.delete('/:id', agentesController.deleteAgente);

module.exports = router;