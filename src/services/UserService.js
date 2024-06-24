import { response } from "express";
import $api from "../settings/axios";

export default class UserService {
   static fetchUsers(){
      return $api.get('/users')
   }
}