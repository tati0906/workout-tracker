const express = require('express');
const router = express.Router();
const usersRoutes = require('./users.routes');
const exercisesRoutes = require('./exercises.routes');
const workoutPlanRoutes = require('./workoutPlan.routes')









router.use('/users', usersRoutes);
router.use('/exercises', exercisesRoutes);
router.use('/workoutplan', workoutPlanRoutes);









module.exports = router;