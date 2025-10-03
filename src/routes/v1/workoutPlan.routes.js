const express = require('express');
const router = express.Router();
const workoutPlanController = require('../../controllers/workoutPlan.controller');

router.use((req, res, next) => {
  req.workouts = [
    {
      id: 1,
      nombre: "Entrenamiento de Fuerza Superior",
      descripcion: "Enfocado en pecho y espalda",
      fecha_programada: "2025-11-20",
      series: [
        {
          id: 1,
          ejercicio_id: 1,
          series: 4,
          repeticiones_por_serie: 12,
          peso_kg: 65.5
        }
      ]
    },
    {
      id: 2,
      nombre: "Entrenamiento de Piernas",
      descripcion: "Enfocado en cuadriceps y glúteos",
      fecha_programada: "2025-11-22",
      series: [
        {
          id: 2,
          ejercicio_id: 2,
          series: 5,
          repeticiones_por_serie: 8,
          peso_kg: 80.0
        }
      ]
    }
  ];
  next();
});

router.get('/', workoutPlanController.getAllWorkouts);
router.get('/:id', workoutPlanController.getWorkoutById);
router.post('/', workoutPlanController.createWorkout);
router.put('/:id', workoutPlanController.updateWorkout);
router.delete('/:id', workoutPlanController.deleteWorkout);
router.get('/:id/series', workoutPlanController.getWorkoutSeries);
router.post('/:id/series', workoutPlanController.addWorkoutSeries);

module.exports = router;