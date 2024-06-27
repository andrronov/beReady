import dbp from '../db.js'
import ApiError from '../exeptions/api-error.js'
import tokenService from '../service/token.service.js'
import { validationResult } from 'express-validator'

class TaskController {
   async getUserTasks(req, res, next){
      const {refreshToken} = req.cookies
      const {id} = tokenService.validateRefreshToken(refreshToken)
      try {
         const tasks = await dbp.query('select * from tasks where user_id = $1', [id])
         res.json(tasks)
      } catch(err){
         next(err)
      }
   }

   async addTask(req, res, next){
      const {title, description} = req.body
      const {refreshToken} = req.cookies
      const {id} = tokenService.validateRefreshToken(refreshToken)
      const validationErrors = validationResult(req)
         if(!validationErrors.isEmpty()){
            return next(ApiError.BadRequest('Ошибка при валидации', validationErrors.array()))
         }
      try{
         const newTask = await dbp.query('insert into tasks (user_id, title, description) values ($1, $2, $3)', [id, title, description])
         res.json(newTask)
      } catch(err){
         next(err)
      }
   }

   async updateTask(req, res, next){
      const {id} = req.params
      const {status} = req.body
      try{
         const task = await dbp.query('update tasks set is_completed = $1 where id = $2', [status, id])
         res.json(task)
      } catch(err){
         next(err)
      }
   }

   async deleteTask(req, res, next){
      const {id} = req.params
      try{
         const deleted_task = await dbp.query("delete from tasks where id = $1", [id])
         res.json(deleted_task)
      } catch(err){
         next(err)
      }
   }
}

export default new TaskController()