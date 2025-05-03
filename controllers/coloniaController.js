 const {
    listarColonias,
    recuperarPorId,
    crearColonia: svcCrearColonia,
    actualizarColonia: svcActualizarColonia,
    eliminarColonia: svcEliminarColonia
  } = require('../services/coloniaService');
  
  /**
   * GET /colonias
   * Lista todas las colonias.
   */
  async function listarTodasColonias(req, res, next) {
    try {
      const colonias = await listarColonias();
      res.render('colonias/list', {
        title: 'Listado de Colonias',
        colonias
      });
    } catch (err) {
      next(err);
    }
  }
  
  /**
   * GET /colonias/new
   * Muestra el formulario para crear una colonia.
   */
  function mostrarFormularioCrear(req, res) {
    res.render('colonias/new', {
      title: 'Crear Colonia'
    });
  }
  
  /**
   * POST /colonias
   * Crea una nueva colonia y redirige al listado.
   */
  async function crearNuevaColonia(req, res, next) {
    try {
      const datos = req.body;
      await svcCrearColonia({
        // Asume que tu colonia sólo necesita un nombre; ajusta según tu modelo
        nombre: datos.nombre
      });
      res.redirect('/colonias');
    } catch (err) {
      next(err);
    }
  }
  
  /**
   * GET /colonias/:id
   * Muestra el detalle de una colonia.
   */
  async function mostrarDetalleColonia(req, res, next) {
    try {
      const { id } = req.params;
      const colonia = await recuperarPorId(id);
      res.render('colonias/detail', {
        title: `Colonia ${id}`,
        colonia
      });
    } catch (err) {
      next(err);
    }
  }
  
  /**
   * GET /colonias/:id/edit
   * Muestra el formulario para editar una colonia.
   */
  async function mostrarFormularioEditar(req, res, next) {
    try {
      const { id } = req.params;
      const colonia = await recuperarPorId(id);
      res.render('colonias/edit', {
        title: `Editar Colonia ${id}`,
        colonia
      });
    } catch (err) {
      next(err);
    }
  }
  
  /**
   * PUT /colonias/:id
   * Actualiza la colonia y redirige al listado.
   */
  async function actualizarColonia(req, res, next) {
    try {
      const { id } = req.params;
      const datos = req.body;
      await svcActualizarColonia({
        id,
        nombre: datos.nombre
      });
      res.redirect('/colonias');
    } catch (err) {
      next(err);
    }
  }
  
  /**
   * DELETE /colonias/:id
   * Elimina la colonia y redirige al listado.
   */
  async function eliminarColonia(req, res, next) {
    try {
      const { id } = req.params;
      await svcEliminarColonia(id);
      res.redirect('/colonias');
    } catch (err) {
      next(err);
    }
  }
  
  module.exports = {
    listarTodasColonias,
    mostrarFormularioCrear,
    crearNuevaColonia,
    mostrarDetalleColonia,
    mostrarFormularioEditar,
    actualizarColonia,
    eliminarColonia
  };
  