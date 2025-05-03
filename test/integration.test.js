const request = require('supertest');
const fs      = require('fs');
const path    = require('path');
const app     = require('../app');

let server;

beforeAll(() => {
  // Preparamos datos de prueba
  const sample = [
    { id: 1, nombre: 'Michi', edad: 3, peso: 4.2, vacunado: true,  cer: true,  enfermedades: [], fechaBorrado: null },
    { id: 2, nombre: 'Luna',  edad: 5, peso: 3.5, vacunado: false, cer: true,  enfermedades: ['rabia'], fechaBorrado: null }
  ];
  fs.writeFileSync(
    path.join(__dirname, '..', 'data', 'gatos.json'),
    JSON.stringify(sample, null, 2)
  );

  // Arrancamos la app en un puerto aleatorio
  server = app.listen(0);
});

afterAll((done) => {
  server.close(done);
});

describe('Integración de rutas Gatos (happy path 200)', () => {
  it('GET  /               → 200 OK', async () => {
    await request(server)
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/);
  });

  it('GET  /gatos           → 200 OK', async () => {
    await request(server)
      .get('/gatos')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(res => {
        if (!res.text.includes('Listado de Gatos')) throw new Error('No mostró el título');
      });
  });

  it('GET  /gatos/new       → 200 OK', async () => {
    await request(server)
      .get('/gatos/new')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(res => {
        if (!res.text.includes('Crear Gato')) throw new Error('No mostró el formulario de creación');
      });
  });

  it('GET  /gatos/1         → 200 OK', async () => {
    await request(server)
      .get('/gatos/1')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(res => {
        if (!res.text.includes('Michi')) throw new Error('No mostró el detalle de Michi');
      });
  });

  it('GET  /gatos/1/edit    → 200 OK', async () => {
    await request(server)
      .get('/gatos/1/edit')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(res => {
        if (!res.text.includes('Editar Gato 1')) throw new Error('No mostró el formulario de edición');
      });
  });
});
