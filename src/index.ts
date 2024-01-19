import express, { Application } from 'express';
import dotenv from 'dotenv';
import Routes from './routes';

//For env File 
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', Routes);

// 404 error
app.use((req, res, next) => {
  res.status(404).send('Página no encontrada');
  res.status(500).send('Error interno del servidor');
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});