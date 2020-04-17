const db = require("../data/db-config.js");

module.exports = {
    getProjects,
    findById,
    getResources,
    getTasks,
    addProjects,
    addResources,
    addTasks
};

function getProjects() {
    return db("projects");
};

function findById(id) {
    return db('projects')
    .where({ id })
    .first()
}

function getResources() {
    return db('resources')
};

function getTasks(id) {
    return db('tasks')
      .select("tasks.id", "tasks.description", "projects.name")
      .join('projects', 'projects.id', 'tasks.project_id')
      .where("project_id", id); 
};

function addProjects(project) {
    return db('projects').insert(project, 'id');
};

function addResources(resource) {
    return db('resources').insert(resource, 'id');
};

function addTasks(id) {
    return db('tasks')
        .join('projects', 'projects.id', 'tasks.project_id')
        .insert(id)
;}