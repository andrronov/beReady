import { Router } from "express";
import Controller from "../controller/user.controller.js";
import TaskController from '../controller/task.controller.js'
import TokenService from "../service/token.service.js";

const router = new Router()

router.get('/users', Controller.getUsers)
router.post('/register-user', Controller.createUser)
router.get('/tasks/:id', TaskController.getUserTasks)
router.post('/add-task', TaskController.addTask)
router.put('/update-task/:id', TaskController.updateTask)
router.delete('/delete-task/:id', TaskController.deleteTask)
router.get('/token/:id', TokenService.saveToken)

export default router