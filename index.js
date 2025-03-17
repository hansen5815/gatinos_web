const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
// configurar Handelebars como motor de plantillas
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
// configurar directorio de vistas
app.set('views', './views');
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
app.get('/', (req, res) => {
    res.render('home', {
        nombre: 'Iván'
    });
});