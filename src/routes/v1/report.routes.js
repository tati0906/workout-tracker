const express = require('express');
const router = express.Router();
const reportController = require('../../controllers/report.controller');

router.get('/', reportController.generateReport);
router.get('/progress', reportController.getProgressReport);
router.post('/', reportController.createReport);
router.delete('/:id', reportController.deleteReport);

module.exports = router;