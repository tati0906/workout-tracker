const express = require('express');
const router = express.Router();
const workoutHorarioController = require('../../controllers/workoutHorario.controller');

router.use((req, res, next) => {
  req.workoutHorarios = [
    {
      id: 1,
      entrenamiento_id: 1,
      fecha_programada: "2024-11-20",
      hora_inicio: "10:00",
      hora_fin: "11:30",
      dias_semana: ["lunes", "miercoles", "viernes"],
      completado: false
    },
    {
      id: 2,
      entrenamiento_id: 2,
      fecha_programada: "2024-11-22",
      hora_inicio: "16:00",
      hora_fin: "17:00",
      dias_semana: ["martes", "jueves"],
      completado: true
    },
    {
      id: 3,
      entrenamiento_id: 3,
      fecha_programada: "2024-11-25",
      hora_inicio: "09:00",
      hora_fin: "10:00",
      dias_semana: ["lunes", "miercoles", "viernes"],
      completado: false
    }
  ];
  next();
});

router.get('/', workoutHorarioController.getAllWorkoutHorarios);
router.get('/:id', workoutHorarioController.getWorkoutHorarioById);
router.post('/', workoutHorarioController.createWorkoutHorario);
router.put('/:id', workoutHorarioController.updateWorkoutHorario);
router.delete('/:id', workoutHorarioController.deleteWorkoutHorario);

module.exports = router;