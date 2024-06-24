import { Router } from "express";
import { body } from "express-validator";
import authMiddleware from "../middlewares/auth-middleware.js";
import Controller from "../controller/user.controller.js";
import TaskController from '../controller/task.controller.js'
import TokenService from "../service/token.service.js";

const router = new Router()

router.get('/users', authMiddleware, Controller.getUsers)
router.post('/registration', body('password').isLength({min: 3, max: 32}), Controller.createUser)
router.post('/login', Controller.login)
router.post('/logout', Controller.logout)
router.get('/refresh', Controller.refresh)

router.get('/tasks/:id', TaskController.getUserTasks)
router.post('/add-task', TaskController.addTask)
router.put('/update-task/:id', TaskController.updateTask)
router.delete('/delete-task/:id', TaskController.deleteTask)
router.get('/token/:id', TokenService.saveToken)

export default router