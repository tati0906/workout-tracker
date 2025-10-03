const express = require('express');
const router = express.Router();
const workoutExerciseController = require('../../controllers/workoutExercise.controller');

router.use((req, res, next) => {
  req.workoutExercises = [
    {
      id: 1,
      entrenamiento_id: 1,
      ejercicio_id: 1,
      series: 4,
      repeticiones_por_serie: 12,
      peso_kg: 65.5
    },
    {
      id: 2,
      entrenamiento_id: 1,
      ejercicio_id: 3,
      series: 3,
      repeticiones_por_serie: 10,
      peso_kg: null
    },
    {
      id: 3,
      entrenamiento_id: 2,
      ejercicio_id: 2,
      series: 5,
      repeticiones_por_serie: 8,
      peso_kg: 80.0
    }
  ];
  next();
});

router.get('/', workoutExerciseController.getAllWorkoutExercises);
router.get('/:id', workoutExerciseController.getWorkoutExerciseById);
router.post('/', workoutExerciseController.createWorkoutExercise);
router.put('/:id', workoutExerciseController.updateWorkoutExercise);
router.patch('/:id', workoutExerciseController.patchWorkoutExercise);
router.delete('/:id', workoutExerciseController.deleteWorkoutExercise);

module.exports = router;