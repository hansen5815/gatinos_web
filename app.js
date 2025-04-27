require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

// Routers
const indexRouter = require('./routes/indexRouter');
const coloniasRouter = require('./routes/coloniasRouter');
const gatosRouter = require('./routes/gatosRouter');


const app = express();

// Configuración de puerto
const PORT = process.env.PORT || 3000;

// Middleware de seguridad y logging
app.use(helmet());
app.use(morgan('dev'));

// Middleware para parseo de cuerpos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos desde "public/"
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de Handlebars como motor de plantillas
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Montar routers
app.use('/', indexRouter);
app.use('/colonias', coloniasRouter);
app.use('/gatos', gatosRouter);

// Manejador de rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).render('404', { url: req.originalUrl });
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: err });
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
