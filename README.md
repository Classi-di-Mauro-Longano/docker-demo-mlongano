# REST API per la gestione di task, con Node.js, Express e SQLite

## Struttura Applicazione (`src/app.js`)

Il file `src/app.js` è il punto di ingresso dell'applicazione server.

### Middleware Globale

L'applicazione utilizza i seguenti middleware per la gestione delle richieste:

- **CORS**: Abilita le richieste cross-origin.
- **Body Parsing**: Supporto per payload JSON e URL-encoded (limite 10kb).

### Configurazione

Il server viene configurato tramite le seguenti variabili d'ambiente:

| Variabile     | Default       | Descrizione                                         |
|---------------|---------------|-----------------------------------------------------|
| `PORT`        | `3000`        | Porta di ascolto del server HTTP                    |
| `HOST`        | `0.0.0.0`     | Interfaccia di rete di ascolto                      |
| `NODE_ENV`    | `development` | Ambiente di esecuzione (`development`/`production`) |
| `CORS_ORIGIN` | `*`           | Origine permessa per le richieste CORS              |

### Endpoints

#### `GET /`

Fornisce informazioni generali sull'API, versione ed elenco delle rotte disponibili.

**Risposta di esempio:**

```json
{
  "name": "Task API",
  "version": "1.0.0",
  "description": "REST API for task management",
  "endpoints": { ... }
}
```

#### `GET /health`

Endpoint di monitoraggio utilizzato per i check di stato (es. Docker Healthcheck).

**Risposta di esempio:**

```json
{
  "status": "healthy",
  "timestamp": "2024-03-20T10:00:00.000Z",
  "uptime": 12.5,
  "environment": "development"
}
```

### Avvio

All'avvio, il server mostra un banner nella console con i dettagli dell'istanza in esecuzione (URL, Environment, Process ID).
