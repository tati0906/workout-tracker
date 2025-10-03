const workoutPlanController = {
  // GET /workouts 
  getAllWorkouts: (req, res) => {
    res.status(200).json(req.workouts);
  },

  // GET /workouts/:id
  getWorkoutById: (req, res) => {
    const { id } = req.params;
    const workout = req.workouts.find(w => w.id === parseInt(id));

    if (!workout) {
      return res.status(404).json({ error: 'Entrenamiento no encontrado' });
    }

    res.status(200).json(workout);
  },

  // POST /workouts
  createWorkout: (req, res) => {
    const { nombre, descripcion, fecha_programada } = req.body;

    if (!nombre || !fecha_programada) {
      return res.status(400).json({ error: 'Nombre y fecha_programada son requeridos' });
    }

    const newWorkout = {
      id: Date.now(),
      nombre,
      descripcion: descripcion || '',
      fecha_programada,
      series: []
    };

    req.workouts.push(newWorkout);
    res.status(201).json(newWorkout);
  },

  // PUT /workouts/:id
  updateWorkout: (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, fecha_programada } = req.body;

    const index = req.workouts.findIndex(w => w.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ error: 'Entrenamiento no encontrado' });
    }

    if (!nombre || !fecha_programada) {
      return res.status(400).json({ error: 'Nombre y fecha_programada son requeridos' });
    }

    req.workouts[index] = {
      ...req.workouts[index],
      nombre,
      descripcion: descripcion || '',
      fecha_programada
    };

    res.status(200).json(req.workouts[index]);
  },

  // DELETE /workouts/:id
  deleteWorkout: (req, res) => {
    const { id } = req.params;
    const index = req.workouts.findIndex(w => w.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({ error: 'Entrenamiento no encontrado' });
    }

    const deletedWorkout = req.workouts.splice(index, 1);
    res.status(200).json({ deleted: deletedWorkout[0].id });
  },

  // GET /workouts/:id/series
  getWorkoutSeries: (req, res) => {
    const { id } = req.params;
    const workout = req.workouts.find(w => w.id === parseInt(id));

    if (!workout) {
      return res.status(404).json({ error: 'Entrenamiento no encontrado' });
    }

    res.status(200).json(workout.series || []);
  },

  // POST /workouts/:id/series
  addWorkoutSeries: (req, res) => {
    const { id } = req.params;
    const { ejercicio_id, series, repeticiones_por_serie, peso_kg } = req.body;

    const workoutIndex = req.workouts.findIndex(w => w.id === parseInt(id));
    if (workoutIndex === -1) {
      return res.status(404).json({ error: 'Entrenamiento no encontrado' });
    }

    if (!ejercicio_id || !series || !repeticiones_por_serie) {
      return res.status(400).json({ error: 'ejercicio_id, series y repeticiones_por_serie son requeridos' });
    }

    const newSeries = {
      id: Date.now(),
      ejercicio_id,
      series,
      repeticiones_por_serie,
      peso_kg: peso_kg || null
    };

    if (!req.workouts[workoutIndex].series) {
      req.workouts[workoutIndex].series = [];
    }

    req.workouts[workoutIndex].series.push(newSeries);
    res.status(201).json(newSeries);
  },

  //PATCH /workouts/:id
  patchWorkout: (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, fecha_programada, comentarios } = req.body;

    const index = req.workouts.findIndex(w => w.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ error: 'Entrenamiento no encontrado' });
    }

    const updatedWorkout = {
      ...req.workouts[index],
      ...(nombre && { nombre }),
      ...(descripcion && { descripcion }),
      ...(fecha_programada && { fecha_programada }),
      ...(comentarios !== undefined && { comentarios })
    };

    req.workouts[index] = updatedWorkout;

    res.status(200).json(updatedWorkout);
  }
};

module.exports = workoutPlanController;