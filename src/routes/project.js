const express = require('express');
const ProjectApi = require('../api/project');
const { route } = require('..');

const router = express.Router();

router.post('/', ProjectApi.createProject)
router.put('/:id', ProjectApi.updateProject)
router.get('/', ProjectApi.findProjects)
router.delete('/:id', ProjectApi.deleteProject)
router.get('/tasks/:projectId', ProjectApi.findProjectsTasks)

module.exports = router;