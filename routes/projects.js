const express = require('express');

const router = express.Router();

const projectController = require('../controllers/project');

router.post('/createProject', projectController.createProject);
router.get('/getProjects', projectController.getProjects);

module.exports = router;