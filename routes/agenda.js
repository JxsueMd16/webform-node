const express = require('express');
const router = express.Router();
const { poolWebform } = require('../db'); // O como lo tengas configurado

// Rutas de agenda
const agendaController = require('../controllers/agendaController');

router.get('/agenda', agendaController.mostrarAgenda);
router.post('/guardar-actividad', agendaController.guardarActividad);
router.post('/eliminar-actividad/:id', agendaController.eliminarActividad);

router.get('/agenda/cursos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [cursos] = await poolWebform.query('SELECT id, nombre FROM tb_cursos WHERE id_semestre = ?', [id]);
        res.json(cursos);
    } catch (err) {
        console.error('Error al obtener cursos:', err);
        res.status(500).json({ error: 'Error al obtener cursos' });
    }
});


module.exports = router;
