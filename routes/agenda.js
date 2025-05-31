const express = require('express');
const router = express.Router();
const { poolWebform } = require('../db');
const agendaController = require('../controllers/agendaController');

// Rutas existentes
router.get('/agenda', agendaController.mostrarAgenda);
router.post('/guardar-actividad', agendaController.guardarActividad);
router.post('/eliminar-actividad/:id', agendaController.eliminarActividad);

// RUTA FALTANTE: obtener cursos por semestre (AJAX)
router.get('/cursos/:id', async (req, res) => {
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
