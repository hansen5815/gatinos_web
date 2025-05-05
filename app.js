/**
 * @file app.js
 * @description
 * Configuración principal de la aplicación Gatinos Web con Express.
 * - Carga variables de entorno
 * - Configura middlewares de seguridad, logging, parseo y public assets
 * - Inicializa Handlebars como motor de plantillas
 * - Monta routers para la home, colonias y gatos
 * - Gestiona rutas 404 y errores 500
 * - Exporta la instancia de Express para tests y arranca el servidor si se ejecuta directamente
 *
 * @module app
 */

require('dotenv').config();

const express        = require('express');
const { engine }     = require('express-handlebars');
const helmet         = require('helmet');
const morgan         = require('morgan');
const path           = require('path');
const methodOverride = require('method-override');

const indexRouter    = require('./routes/indexRouter');
const coloniasRouter = require('./routes/coloniasRouter');
const gatosRouter    = require('./routes/gatosRouter');

const app = express();

/**
 * Puerto en el que la aplicación escucha.
 * @type {number}
 */
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', engine({
  extname:      '.handlebars',
  defaultLayout:'main',
  layoutsDir:   path.join(__dirname, 'views', 'layouts'),
  partialsDir:  path.join(__dirname, 'views', 'partials'),
  helpers: {
    eq: (a, b) => a === b
  }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRouter);
app.use('/colonias', coloniasRouter);
app.use('/gatos', gatosRouter);

app.use((req, res) => {
  res.status(404).render('404', { url: req.originalUrl });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: err });
});

/**
 * Exporta la instancia de Express para testing.
 * @type {Object}
 */
module.exports = app;

/**
 * Arranca el servidor si ejecutamos `node app.js` directamente.
 */
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}
