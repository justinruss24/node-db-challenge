const express = require("express");

const Projects = require("./projectModel.js");

const router = express.Router();

router.get('/', (req, res) => {
    Projects.getProjects()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: "failed to get projects" })
    })
});

router.get('/resources', (req, res) => {
    Projects.getResources()
    .then(resources => {
        res.status(200).json(resources)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: "failed to get resources" })
    })
});

router.get('/:id/tasks', (req, res) => {
    const { id } = req.params;
    Projects.getTasks(id)
    .then(tasks => {
            res.status(200).json(tasks)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: "failed to get tasks"})
    })
});

router.post('/', (req, res) => {
    Projects.addProjects(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: "failed to add project" })
    })
})

router.post('/resources', (req, res) => {
    Projects.addResources(req.body)
    .then(resources => {
        res.status(201).json(resources)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: "failed to add resource" })
    })
});

router.post('/:id/tasks', (req, res) => {
    const { id } = req.params
    Projects.addTasks(req.body, id)
    .then(task => {
        res.status(201).json(task)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: "Failed to add a task to project" })
    })
});

module.exports = router;