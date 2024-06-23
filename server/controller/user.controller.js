import dbp from '../db.js'
import bcrypt from 'bcrypt'
import TokenService from '../service/token.service.js'
import ApiError from '../exeptions/api-error.js'

class Controller {
   async createUser(req, res, next){
      const {username, password} = req.body
      try{
         const hashedPassword = await bcrypt.hash(password, 10)
         const newUser = await dbp.query('insert into users (username, password) values ($1, $2) returning id', [username, hashedPassword])
         const tokens = TokenService.generateToken(newUser.rows[0])
         await TokenService.saveToken(newUser.rows[0].id, tokens.refreshToken)
         res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

         return res.json({ ...tokens, newUser})
      } catch(err){
         next(err)
      }
   }

   async getUsers(req, res, next){
      try{
         const answer = await dbp.query('select * from users')
      
         res.json(answer.rows)
      } catch(err){
         next(err)
      }
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