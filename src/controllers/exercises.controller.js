const exercisesController = {
  // GET /exercises
  getAllExercises: (req, res) => {
    const { category, muscle_group } = req.query;
    let result = req.exercises;

    if (category) {
      result = result.filter(ex => ex.categoria === category);
    }

    if (muscle_group) {
      result = result.filter(ex => ex.grupo_muscular === muscle_group);
    }

    res.status(200).json(result);
  },

  // GET /exercises/:id
  getExerciseById: (req, res) => {
    const { id } = req.params;
    const exercise = req.exercises.find(ex => ex.id === parseInt(id));

    if (!exercise) {
      return res.status(404).json({ error: 'Ejercicio no encontrado' });
    }

    res.status(200).json(exercise);
  },

  // POST /exercises
  createExercise: (req, res) => {
    const { nombre, descripcion, categoria, grupo_muscular } = req.body;

    if (!nombre || !descripcion || !categoria || !grupo_muscular) {
      return res.status(400).json({ error: 'Nombre, descripcion, categoria y grupo_muscular son requeridos' });
    }

    const newExercise = {
      id: Date.now(),
      nombre,
      descripcion,
      categoria,
      grupo_muscular
    };

    req.exercises.push(newExercise);
    res.status(201).json(newExercise);
  },

  // PUT /exercises/:id
  updateExercise: (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, categoria, grupo_muscular } = req.body;

    const index = req.exercises.findIndex(ex => ex.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ error: 'Ejercicio no encontrado' });
    }

    if (!nombre || !descripcion || !categoria || !grupo_muscular) {
      return res.status(400).json({ error: 'Nombre, descripcion, categoria y grupo_muscular son requeridos' });
    }

    req.exercises[index] = {
      ...req.exercises[index],
      nombre,
      descripcion,
      categoria,
      grupo_muscular
    };

    res.status(200).json(req.exercises[index]);
  },

  // DELETE /exercises/:id
  deleteExercise: (req, res) => {
    const { id } = req.params;
    const index = req.exercises.findIndex(ex => ex.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({ error: 'Ejercicio no encontrado' });
    }

    const deletedExercise = req.exercises.splice(index, 1);
    res.status(200).json({ deleted: deletedExercise[0].id });
  },

  //PATCH /exercises/:id
  patchExercise: (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, categoria, grupo_muscular } = req.body;

    const index = req.exercises.findIndex(ex => ex.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ error: 'Ejercicio no encontrado' });
    }

    const updatedExercise = {
      ...req.exercises[index],
      ...(nombre && { nombre }),
      ...(descripcion && { descripcion }),
      ...(categoria && { categoria }),
      ...(grupo_muscular && { grupo_muscular })
    };

    req.exercises[index] = updatedExercise;

    res.status(200).json(updatedExercise);
  }
};

module.exports = exercisesController;