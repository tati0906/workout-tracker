const express = require('express');
const router = express.Router();
const usersRoutes = require('./users.routes');
const exercisesRoutes = require('./exercises.routes');
const workoutPlanRoutes = require('./workoutPlan.routes');
const workoutExerciseRoutes = require('./workoutExercise.routes');
const workoutHorarioRoutes = require('./workoutHorario.routes');


router.use('/users', usersRoutes);
router.use('/exercises', exercisesRoutes);
router.use('/workoutplan', workoutPlanRoutes);
router.use('/workoutexercise', workoutExerciseRoutes);
router.use('/workouthorario', workoutHorarioRoutes);


module.exports = router;