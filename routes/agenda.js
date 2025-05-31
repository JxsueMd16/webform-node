const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');

router.get('/agenda', agendaController.mostrarAgenda);
router.post('/guardar-actividad', agendaController.guardarActividad);
router.post('/eliminar-actividad/:id', agendaController.eliminarActividad);

module.exports = router;
