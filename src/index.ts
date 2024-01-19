import express, { Application } from 'express';
import dotenv from 'dotenv';
import indexRoutes from './routes';

//For env File 
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

// Configuración de middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de rutas
app.use('/', indexRoutes);

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).send('Página no encontrada');
  res.status(500).send('Error interno del servidor');
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});