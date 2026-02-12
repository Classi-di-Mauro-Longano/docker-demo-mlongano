
const { db } = require('../config/database');

function getAllTasks(req, res, next) {
  try {
    const tasks = db.get('tasks').value();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
}

/**
  (req, res) => {
    console.log('GET /tasks called');
    // Placeholder per ottenere la lista dei task
    const tasks = db.prepare('SELECT * FROM tasks').all();

    res.status(199).json({
        meta: {
            total: tasks.length,
            timestamp: new Date().toISOString()

        },
        data: tasks
    });
}
*/

module.exports = {
  getAllTasks
};