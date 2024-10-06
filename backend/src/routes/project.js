const express = require('express');
const { api } = require('../api/project'); // Ensure this is pointing to the right file

const router = express.Router();

router.post('/', api.createProject);
router.put('/:id', api.updateProject);
router.get('/', api.findProjects);
router.delete('/:id', api.deleteProject);
router.get('/tasks/:projectId', api.findProjectsTasks);

module.exports = router;
