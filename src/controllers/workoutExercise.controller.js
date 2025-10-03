const workoutExerciseController = {
  // GET /workoutexercise
  getAllWorkoutExercises: (req, res) => {
    res.status(200).json(req.workoutExercises);
  },

  // GET /workoutexercise/:id 
  getWorkoutExerciseById: (req, res) => {
    const { id } = req.params;
    const workoutExercise = req.workoutExercises.find(we => we.id === parseInt(id));

    if (!workoutExercise) {
      return res.status(404).json({ error: 'Serie no encontrada' });
    }

    res.status(200).json(workoutExercise);
  },

  // POST /workoutexercise
  createWorkoutExercise: (req, res) => {
    const { entrenamiento_id, ejercicio_id, series, repeticiones_por_serie, peso_kg } = req.body;

    if (!entrenamiento_id || !ejercicio_id || !series || !repeticiones_por_serie) {
      return res.status(400).json({ 
        error: 'entrenamiento_id, ejercicio_id, series y repeticiones_por_serie son requeridos' 
      });
    }

    const newWorkoutExercise = {
      id: Date.now(),
      entrenamiento_id,
      ejercicio_id,
      series,
      repeticiones_por_serie,
      peso_kg: peso_kg || null
    };

    req.workoutExercises.push(newWorkoutExercise);
    res.status(201).json(newWorkoutExercise);
  },

  // PUT /workoutexercise/:id
  updateWorkoutExercise: (req, res) => {
    const { id } = req.params;
    const { series, repeticiones_por_serie, peso_kg } = req.body;

    const index = req.workoutExercises.findIndex(we => we.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ error: 'Serie no encontrada' });
    }

    if (!series || !repeticiones_por_serie) {
      return res.status(400).json({ error: 'series y repeticiones_por_serie son requeridos' });
    }

    req.workoutExercises[index] = {
      ...req.workoutExercises[index],
      series,
      repeticiones_por_serie,
      peso_kg: peso_kg || null
    };

    res.status(200).json(req.workoutExercises[index]);
  },

  // DELETE /workoutexercise/:id 
  deleteWorkoutExercise: (req, res) => {
    const { id } = req.params;
    const index = req.workoutExercises.findIndex(we => we.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({ error: 'Serie no encontrada' });
    }

    const deletedWorkoutExercise = req.workoutExercises.splice(index, 1);
    res.status(200).json({ deleted: deletedWorkoutExercise[0].id });
  },

  // PATCH /workoutexercise/:id
  patchWorkoutExercise: (req, res) => {
    const { id } = req.params;
    const { series, repeticiones_por_serie, peso_kg } = req.body;

    if (!req.body) {
      return res.status(400).json({ error: 'Body vacío o no enviado como JSON' });
    }

    const index = req.workoutExercises.findIndex(we => we.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ error: 'Serie no encontrada' });
    }

    const updatedWorkoutExercise = {
      ...req.workoutExercises[index],
      ...(series !== undefined && { series }),
      ...(repeticiones_por_serie !== undefined && { repeticiones_por_serie }),
      ...(peso_kg !== undefined && { peso_kg })
    };

    req.workoutExercises[index] = updatedWorkoutExercise;

    res.status(200).json(updatedWorkoutExercise);
  }
};

module.exports = workoutExerciseController;