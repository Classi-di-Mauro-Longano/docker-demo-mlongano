const express = require('express');

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';


// Inizializza Express
const app = express();

// Healthcheck endpoint (usato da Docker e load balancer)
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV
  });
});


app.listen(PORT, HOST, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                    Task API Server                     ║
╠═══════════════════════════════════════════════════════╣
║  Status:      Running                                  ║
║  URL:         http://${HOST}:${PORT.toString().padEnd(32)}║
║  Environment: ${NODE_ENV.padEnd(40)}║
║  Process ID:  ${process.pid.toString().padEnd(40)}║
╚═══════════════════════════════════════════════════════╝
  `);
});
