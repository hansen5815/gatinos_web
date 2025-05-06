# Gatinos Web

Aplicación de gestión de colonias y censo de gatos callejeros, desarrollada como ejercicio de la asignatura **Desarrollo de Aplicaciones Web en Entorno Servidor (DAWES)** del CIFP La Laboral de Gijón.

---

## 📖 Descripción

- CRUD completo de **gatos** y **colonias**, con borrado lógico.  
- Cálculo automático del **estado de salud** de cada gato (SANO ▪ REGULAR ▪ GRAVE).  
- Asociación **Gato → Colonia** (selección en formularios).  
- Vistas server-side con **Express Handlebars** y diseño responsive con **Bootstrap 5**.  
- Tests unitarios (Jest) e integración (SuperTest).  
- Documentación generada con **JSDoc**.

---

## ⚙️ Requisitos

- [Node.js](https://nodejs.org/) v16+  
- [npm](https://www.npmjs.com/) v8+  

---

## 🚀 Instalación

1. Clona este repositorio  
   ```bash
   git clone https://github.com/hansen5815/gatinos-web.git
   cd gatinos-web
   ```
2. Instala dependencias  
   ```bash
   npm install
   ```
3. Crea un fichero `.env` en la raíz (opcional):  
   ```env
   PORT=3000
   ```
4. Rellena los datos de ejemplo en `data/gatos.json` y `data/colonias.json` (ya hay mocks incluidos).

---

## 🏃‍♂️ Uso

- **Modo desarrollo** (con recarga automática):  
  ```bash
  npm run dev
  ```
- **Modo producción**:  
  ```bash
  npm start
  ```
- Abre tu navegador en `http://localhost:3000`.

---

## 📂 Estructura de carpetas

```
gatinos-web/
├─ controllers/           # Controladores (MVC)
├─ routes/                # Definición de rutas
├─ services/              # Lógica de negocio
├─ repositories/          # Acceso a datos (JSON)
├─ views/                 # Plantillas Handlebars
│  ├─ layouts/
│  ├─ partials/
│  └─ gatos/, colonias/
├─ public/                # CSS, imágenes, JS cliente
├─ data/                  # Ficheros JSON de mock data
├─ test/                  # Tests unitarios e integración
├─ app.js                 # Punto de entrada de la aplicación
├─ server.js              # Servidor de ejemplo “Hola mundo”
├─ package.json
└─ jsdoc.json             # Configuración de JSDoc
```

---

## 🔧 Scripts disponibles

- `npm run dev` — Inicia con **nodemon** en puerto `3000`.  
- `npm start` — Inicia la aplicación con **node**.  
- `npm test` — Ejecuta **Jest** (unit + integración) con cobertura.  
- `npm run docs` — Genera la documentación JSDoc en `docs/`.  

---

## 📋 Rutas principales

### Home  
- `GET /` — Página de inicio con botones de acceso.

### Gatos  
- `GET /gatos` — Listado de gatos activos.  
- `GET /gatos/new` — Formulario creación.  
- `POST /gatos` — Crear nuevo.  
- `GET /gatos/:id` — Detalle.  
- `GET /gatos/:id/edit` — Formulario edición.  
- `PUT /gatos/:id` — Actualizar.  
- `DELETE /gatos/:id` — Borrado lógico.

### Colonias  
- `GET /colonias` — Listado de colonias.  
- `GET /colonias/new` — Formulario creación.  
- `POST /colonias` — Crear nueva.  
- `GET /colonias/:id` — Detalle.  
- `GET /colonias/:id/edit` — Formulario edición.  
- `PUT /colonias/:id` — Actualizar.  
- `DELETE /colonias/:id` — Borrado lógico.

---

## 🧪 Testing

- **Unitarios**: Tests de repositorios y servicios con **Jest** + mocks de FS.  
- **Integración**: End-to-end de rutas con **SuperTest**.  
- Ejecuta `npm test` para verificar que todo pase en **200 OK**.

---

## 📜 Licencia

Este proyecto es un **ejercicio académico** y no requiere licencia.  
Puedes utilizarlo y adaptarlo como referencia para tus prácticas.

---

## 👤 Autor

- **Iván Castaño Martínez**  
- CIFP La Laboral – DAWES  
