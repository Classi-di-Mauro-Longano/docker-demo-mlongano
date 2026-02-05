const cors = require('cors');

const express = require('express');

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const { initializeDatabase } = require('./config/database');

// Inizializza Express
const app = express();
const taskRoutes = require('./routes/taskRoutes');

// CORS: permette richieste cross-origin (configurabile per produzione)
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parser JSON per request body
app.use(express.json({ limit: '10kb' }));  // Limita dimensione body per sicurezza

// Parser URL-encoded (per form submissions)
app.use(express.urlencoded({ extended: true, limit: '10kb' }));



// ======= ROUTES =======
// Healthcheck endpoint (usato da Docker e load balancer)
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV
  });
});

// API info endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Task API',
    version: '1.0.0',
    description: 'REST API for task management',
    endpoints: {
      health: 'GET /health',
      tasks: {
        list: 'GET /tasks',
        get: 'GET /tasks/:id',
        create: 'POST /tasks',
        update: 'PUT /tasks/:id',
        patch: 'PATCH /tasks/:id',
        delete: 'DELETE /tasks/:id'
      }
    }
  });
});

app.use('/tasks', taskRoutes);

// ===== Initialise the Database =====
initializeDatabase();


app.listen(PORT, HOST, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                    Task API Server                    ║
╠═══════════════════════════════════════════════════════╣
║  Status:      Running                                 ║
║  URL:         http://${HOST}:${PORT.toString().padEnd(25)}║
║  Environment: ${NODE_ENV.padEnd(40)}║
║  Process ID:  ${process.pid.toString().padEnd(40)}║
╚═══════════════════════════════════════════════════════╝
  `);
});
