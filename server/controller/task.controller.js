import dbp from '../db.js'
import ApiError from '../exeptions/api-error.js'

class TaskController {
   async getUserTasks(req, res, next){
      const userId = req.params.id
      try {
         const tasks = await dbp.query('select * from tasks where user_id = $1', [userId])
         res.json(tasks.rows)
      } catch(err){
         next(err)
      }
   }

   async addTask(req, res, next){
      const {title, description, user_id} = req.body
      try{
         const newTask = await dbp.query('insert into tasks (user_id, title, description) values ($1, $2, $3)', [user_id, title, description])
         res.json(newTask)
      } catch(err){
         next(err)
      }
   }

   async updateTask(req, res, next){
      const {task_id, is_completed} = req.body
      try{
         const task = await dbp.query('update tasks set is_completed = $1 where id = $2', [is_completed, task_id])
         res.json(task)
      } catch(err){
         next(err)
      }
   }

   async deleteTask(req, res, next){
      const task_id = req.body
      try{
         const deleted_task = await dbp.query("delete from tasks where id = $1", [task_id])
         res.json(deleted_task)
      } catch(err){
         next(err)
      }
   }
}

export default new TaskController()