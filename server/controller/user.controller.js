import dbp from '../db.js'
import bcrypt from 'bcrypt'

class Controller {
   async createUser(req, res){
      const {username, password} = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = await dbp.query('insert into users (username, password) values ($1, $2)', [username, hashedPassword])

      res.json(newUser)
   }

   async getUsers(req, res){
      const answer = await dbp.query('select * from users')
      
      res.json(answer.rows)
   }

   //ПОКА НЕ НУЖНО
   // async getUser(req, res){

   // }

   // async updateUser(req, res){

   // }

   // async deleteUser(req, res){

   // }
}

export default new Controller()