/**
 * Task Routes
 * 
 * Definisce tutti gli endpoint REST per la gestione dei task.
 * Segue le convenzioni RESTful standard.
 * 
 * Endpoints:
 *   GET    /tasks       - Lista tutti i task (con filtri e paginazione)
 *   GET    /tasks/:id   - Ottieni un singolo task
 *   POST   /tasks       - Crea un nuovo task
 *   PUT    /tasks/:id   - Aggiorna completamente un task
 *   PATCH  /tasks/:id   - Aggiorna parzialmente un task
 *   DELETE /tasks/:id   - Elimina un task
 */

const express = require('express');
const router = express.Router();
const { db } = require('../config/database');
const { getAllTasks } = require('../controllers/taskControllers');

router.post('/', (req, res) => {
    try {
        const { title, description = null, priority = 'medium' } = req.body;
        console.log(req.body);
        console.log(title, description, priority);

        const result = db.prepare(`
      INSERT INTO tasks (title, description, priority)
      VALUES (@title, @description, @priority)
    `).run({ title, description, priority });

        // Recupera il task appena creato per restituirlo completo
        const newTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);

        res.status(200).json({
            message: 'Task created successfully',
            data: newTask
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

router.get('/', getAllTasks);

router.get('/:id', (req, res) => {
    const taskId = req.params.id;
    // Placeholder per ottenere un singolo task
    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(taskId);
    if (task) {
        res.status(200).json({
            meta: {
                timestamp: new Date().toISOString()
            },
            data: task
        });
    } else {
        res.status(404).json({
            error: 'Task not found'
        });
    }
});

module.exports = router;