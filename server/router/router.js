import { Router } from "express";
import Controller from "../controller/user.controller.js";

const router = new Router()

router.get('/users', Controller.getUsers)
router.post('/user', Controller.createUser)

export default router