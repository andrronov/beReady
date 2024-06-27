import dbp from '../db.js'
import bcrypt from 'bcrypt'
import TokenService from '../service/token.service.js'
import ApiError from '../exeptions/api-error.js'
import { validationResult } from 'express-validator'
import tokenService from '../service/token.service.js'

class Controller {
   async createUser(req, res, next){
      const {username, password} = req.body
      try{
         const validationErrors = validationResult(req)
         if(!validationErrors.isEmpty()){
            return next(ApiError.BadRequest('Ошибка при валидации', validationErrors.array()))
         }
         const hashedPassword = await bcrypt.hash(password, 10)
         const newUser = await dbp.query('insert into users (username, password) values ($1, $2) returning *', [username, hashedPassword])
         const tokens = TokenService.generateToken(newUser.rows[0])
         await TokenService.saveToken(newUser.rows[0].id, tokens.refreshToken)
         res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

         return res.json({ ...tokens, username: newUser.rows[0].username, user_id: newUser.rows[0].id})
      } catch(err){
         next(err)
      }
   }

   async login(req, res, next){
      try{
         console.log('req', req.body);
         const {username, password} = req.body
         const user = await dbp.query('select * from users where username = $1', [username])
         if(user.rows.length < 1){
            throw ApiError.BadRequest('Такого пользователя не существует')
         }
         const userPass = await dbp.query('select password from users where username = $1', [username])
         const isPasswordsEqual = await bcrypt.compare(password, userPass.rows[0].password)
         if(!isPasswordsEqual){
            throw ApiError.BadRequest('Неверный пароль')
         }
         const tokens = TokenService.generateToken(user.rows[0])
         await TokenService.saveToken(user.rows[0].id, tokens.refreshToken)
         
         res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

         return res.json({ ...tokens, user_id: user.rows[0].id, username: user.rows[0].username})
      } catch(err){
         next(err)
      }
   }

   async logout(req, res, next){
      try{
         const {refreshToken} = req.cookies
         const token = TokenService.removeToken(refreshToken)
         res.clearCookie('refreshToken')
         res.json(token)
      } catch(err){
         next(err)
      }
   }

   async refresh(req, res, next){
      try {
         const {refreshToken} = req.cookies
         if(!refreshToken){
            throw ApiError.UnauthorizedError()
         }
         const userData = TokenService.validateRefreshToken(refreshToken)
         const tokenFromDb = await TokenService.findToken(refreshToken)
         if(!userData || !tokenFromDb){
            throw ApiError.UnauthorizedError()
         }
         const user = await dbp.query('select * from users where id = $1', [tokenFromDb.user_id])
         const tokens = TokenService.generateToken(user.rows[0])
         await TokenService.saveToken(tokenFromDb.user_id, tokens.refreshToken)
         
         res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

         return res.json({ ...tokens, user_id: tokenFromDb.user_id, username: user.rows[0].username})
      } catch (err) {
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
}

export default new Controller()