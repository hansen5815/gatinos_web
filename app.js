// Cargar variables de entorno
require('dotenv').config();

// Importar dependencias
const express = require('express');
const { engine } = require('express-handlebars');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

// Crear app de Express
const app = express();

// Routers
const indexRouter = require('./routes/indexRouter');
console.log('DEBUG indexRouter:', indexRouter);

const coloniasRouter = require('./routes/coloniasRouter');
console.log('DEBUG coloniasRouter:', coloniasRouter);

const gatosRouter = require('./routes/gatosRouter');
console.log('DEBUG gatosRouter:', gatosRouter);

// Configuración de puerto
const PORT = process.env.PORT || 3000;

// Middlewares de seguridad y logging
app.use(helmet());
app.use(morgan('dev'));

// Middlewares para parsear cuerpo de las peticiones
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de Handlebars como motor de plantillas
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Montar los routers
app.use('/', indexRouter);
app.use('/colonias', coloniasRouter);
app.use('/gatos', gatosRouter);

// Middleware para manejar rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).render('404', { url: req.originalUrl });
});

// Middleware para manejar errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: err });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
