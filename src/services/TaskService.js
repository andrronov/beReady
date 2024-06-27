import $api from "../settings/axios.js";

export default class TaskService {
   static async getUserTasks(){
      return $api.get('/tasks')
   }
   static async addTask(title, description){
      return $api.post('/add-task', {title, description})
   }
   static async updateTask(id, status){
      return $api.put(`/update-task/${id}`, {status})
   }
   static async deleteTask(id){
      return $api.delete(`/delete-task/${id}`)
   }
} 