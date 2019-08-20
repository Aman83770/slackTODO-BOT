const express = require("express");

const router = express.Router();

var task = require('../controllers/taskController');

router.post("/create", task.createTask);

router.post("/get", task.getAllTaks);

router.post("/delete", task.deleteTask);

module.exports = router;