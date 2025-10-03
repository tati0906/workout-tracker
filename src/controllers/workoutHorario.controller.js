const workoutHorarioController = {
  // GET /workouthorario
  getAllWorkoutHorarios: (req, res) => {
    res.status(200).json(req.workoutHorarios);
  },

  // GET /workouthorario/:id
  getWorkoutHorarioById: (req, res) => {
    const { id } = req.params;
    const horario = req.workoutHorarios.find(wh => wh.id === parseInt(id));

    if (!horario) {
      return res.status(404).json({ error: 'Horario no encontrado' });
    }

    res.status(200).json(horario);
  },

  // POST /workouthorario
  createWorkoutHorario: (req, res) => {
    const { entrenamiento_id, fecha_programada, hora_inicio, hora_fin, dias_semana } = req.body;

    if (!entrenamiento_id || !fecha_programada || !hora_inicio) {
      return res.status(400).json({ 
        error: 'entrenamiento_id, fecha_programada y hora_inicio son requeridos' 
      });
    }

    const newHorario = {
      id: Date.now(),
      entrenamiento_id,
      fecha_programada,
      hora_inicio,
      hora_fin: hora_fin || '',
      dias_semana: dias_semana || [],
      completado: false
    };

    req.workoutHorarios.push(newHorario);
    res.status(201).json(newHorario);
  },

  // PUT /workouthorario/:id
  updateWorkoutHorario: (req, res) => {
    const { id } = req.params;
    const { fecha_programada, hora_inicio, hora_fin, dias_semana, completado } = req.body;

    const index = req.workoutHorarios.findIndex(wh => wh.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ error: 'Horario no encontrado' });
    }

    if (!fecha_programada || !hora_inicio) {
      return res.status(400).json({ error: 'fecha_programada y hora_inicio son requeridos' });
    }

    req.workoutHorarios[index] = {
      ...req.workoutHorarios[index],
      fecha_programada,
      hora_inicio,
      hora_fin: hora_fin || '',
      dias_semana: dias_semana || req.workoutHorarios[index].dias_semana,
      completado: completado !== undefined ? completado : req.workoutHorarios[index].completado
    };

    res.status(200).json(req.workoutHorarios[index]);
  },

  // DELETE /workouthorario/:id
  deleteWorkoutHorario: (req, res) => {
    const { id } = req.params;
    const index = req.workoutHorarios.findIndex(wh => wh.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({ error: 'Horario no encontrado' });
    }

    const deletedHorario = req.workoutHorarios.splice(index, 1);
    res.status(200).json({ deleted: deletedHorario[0].id });
  }
};

module.exports = workoutHorarioController;