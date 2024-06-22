import dbp from '../db.js'

class TaskController {
   async getUserTasks(req, res){
      const userId = req.params.id
      try {
         const tasks = await dbp.query('select * from tasks where user_id = $1', [userId])
         res.json(tasks.rows)
      } catch(err){
         console.error(err);
         res.status(500).json({error: "didn't found"})
      }
   }

   async addTask(req, res){
      const {title, description} = req.body
      const user_id = req.params.id
      try{
         const newTask = await dbp.query('insert into tasks (user_id, title, description) values ($1, $2, $3)', [user_id, title, description])
         res.json(newTask)
      } catch(err){
         console.error(err);
         res.status(501).json({error: "there's some problem"})
      }
   }

   async updateTask(req, res){
      const {task_id, is_completed} = req.body
      try{
         const task = await dbp.query('update tasks set is_completed = $1 where id = $2', [is_completed, task_id])
      } catch(err){
         console.error(err);
         res.status(501).json({error: "there's some problem"})
      }
   }
}

export default new TaskController()