/**
 * Servidor HTTP básico con Express.
 * @module server
 */

const express = require('express');
const app     = express();
const port    = 3000;

/**
 * GET /
 * Responde con un saludo.
 */
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

/**
 * Arranca el servidor en el puerto configurado.
 */
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

module.exports = app;
