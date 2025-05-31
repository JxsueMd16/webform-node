const { poolWebform } = require('../db');

// Mostrar formulario y actividades
exports.mostrarAgenda = async (req, res) => {
    try {
        const [semestres] = await poolWebform.query('SELECT * FROM tb_semestres');
        const [actividades] = await poolWebform.query(`
            SELECT tb_actividades.id, tb_semestres.nombre AS semestre, tb_cursos.nombre AS curso, tb_actividades.actividad
            FROM tb_actividades
            JOIN tb_cursos ON tb_actividades.id_curso = tb_cursos.id
            JOIN tb_semestres ON tb_cursos.id_semestre = tb_semestres.id
        `);
        res.render('agenda', { semestres, actividades });
    } catch (err) {
        console.error('Error al cargar la agenda:', err);
        res.status(500).send('Error al cargar la agenda.');
    }
};

// Guardar actividad
exports.guardarActividad = async (req, res) => {
    const { curso, actividad } = req.body;
    try {
        await poolWebform.query('INSERT INTO tb_actividades (id_curso, actividad) VALUES (?, ?)', [curso, actividad]);
        res.redirect('/agenda');
    } catch (err) {
        console.error('Error al guardar la actividad:', err);
        res.status(500).send('Error al guardar la actividad.');
    }
};

// Eliminar actividad
exports.eliminarActividad = async (req, res) => {
    const { id } = req.params;
    try {
        await poolWebform.query('DELETE FROM tb_actividades WHERE id = ?', [id]);
        res.redirect('/agenda');
    } catch (err) {
        console.error('Error al eliminar la actividad:', err);
        res.status(500).send('Error al eliminar la actividad.');
    }
};
exports.mostrarEditarActividad = async (req, res) => {
    const { id } = req.params;
    try {
        const [actividad] = await poolWebform.query(`
            SELECT tb_actividades.id, tb_actividades.actividad, tb_cursos.id AS id_curso, tb_cursos.id_semestre 
            FROM tb_actividades 
            JOIN tb_cursos ON tb_actividades.id_curso = tb_cursos.id 
            WHERE tb_actividades.id = ?`, [id]);
        const [semestres] = await poolWebform.query('SELECT * FROM tb_semestres');
        const [cursos] = await poolWebform.query('SELECT * FROM tb_cursos WHERE id_semestre = ?', [actividad[0].id_semestre]);
        res.render('editarAgenda', { actividad: actividad[0], semestres, cursos });
    } catch (err) {
        console.error('Error al cargar la actividad para editar:', err);
        res.status(500).send('Error al cargar la actividad para editar.');
    }
};


exports.editarActividad = async (req, res) => {
    const { id } = req.params;
    const { curso, actividad } = req.body;
    try {
        await poolWebform.query('UPDATE tb_actividades SET id_curso = ?, actividad = ? WHERE id = ?', [curso, actividad, id]);
        res.redirect('/agenda');
    } catch (err) {
        console.error('Error al editar la actividad:', err);
        res.status(500).send('Error al editar la actividad.');
    }
};
