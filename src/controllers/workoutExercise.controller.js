const workoutExerciseController = {
  // GET /workout-exercises 
  getAllWorkoutExercises: (req, res) => {
    res.status(200).json(req.workoutExercises);
  },

  // GET /workout-exercises/:id 
  getWorkoutExerciseById: (req, res) => {
    const { id } = req.params;
    const workoutExercise = req.workoutExercises.find(we => we.id === parseInt(id));

    if (!workoutExercise) {
      return res.status(404).json({ error: 'Serie no encontrada' });
    }

    res.status(200).json(workoutExercise);
  },

  // POST /workout-exercises
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

  // PUT /workout-exercises/:id
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

  // DELETE /workout-exercises/:id 
  deleteWorkoutExercise: (req, res) => {
    const { id } = req.params;
    const index = req.workoutExercises.findIndex(we => we.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({ error: 'Serie no encontrada' });
    }

    const deletedWorkoutExercise = req.workoutExercises.splice(index, 1);
    res.status(200).json({ deleted: deletedWorkoutExercise[0].id });
  }
};

module.exports = workoutExerciseController;