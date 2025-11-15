import { Router } from "express";
import { body } from "express-validator";
import authMiddleware from "../middlewares/auth-middleware.js";
import { taskValidator, userValidator } from "../validators/index.js";
import Controller from "../controller/user.controller.js";
import TaskController from "../controller/task.controller.js";
import TokenService from "../service/token.service.js";

const router = new Router();
const { registration } = userValidator();
const { add } = taskValidator();

router.get("/users", authMiddleware, Controller.getUsers);
router.post("/registration", registration(body), Controller.createUser);
router.post("/login", registration(body), Controller.login);
router.post("/logout", Controller.logout);
router.get("/refresh", Controller.refresh);

router.get("/tasks", TaskController.getUserTasks);
router.post("/add-task", add(body), TaskController.addTask);
router.put("/update-task/:id", TaskController.updateTask);
router.delete("/delete-task/:id", TaskController.deleteTask);

router.get("/token/:id", TokenService.saveToken);

export default router;
