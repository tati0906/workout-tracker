const reportController = {
  // GET /reports
  generateReport: (req, res) => {
    const report = {
      usuario_id: 1,
      entrenamientos_completados: 8,
      entrenamientos_totales: 12,
      porcentaje_completado: 67,
      ejercicios_frecuentes: [
        "Press de Banca",
        "Sentadillas", 
        "Dominadas"
      ]
    };

    res.status(200).json(report);
  },

  // GET /reports/progress
  getProgressReport: (req, res) => {
    const progress = {
      usuario_id: 1,
      entrenamientos_esta_semana: 3,
      promedio_semanal: 4,
      tendencia: "mejorando"
    };

    res.status(200).json(progress);
  },

  // POST /reports 
  createReport: (req, res) => {
    const { tipo, nombre, parametros } = req.body;

    if (!tipo || !nombre) {
      return res.status(400).json({ error: 'Tipo y nombre son requeridos' });
    }

    const newReport = {
      id: Date.now(),
      tipo,
      nombre,
      parametros: parametros || {},
      fecha_creacion: new Date().toISOString()
    };

    res.status(201).json(newReport);
  },

  // DELETE /reports/:id
  deleteReport: (req, res) => {
    const { id } = req.params;
    
    res.status(200).json({ 
      message: 'Reporte eliminado',
      deleted_id: id 
    });
  }
};

module.exports = reportController;