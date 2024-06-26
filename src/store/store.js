import { defineStore } from "pinia";
import axios from "axios";
import AuthService from "../services/AuthService.js";
import { API_URL } from "../settings/axios.js";
import router from "../router.js";

export const useDataStore = defineStore('data', {
   state: () => ({
      user: {username: '', id: null},
      isAuth: false,
      isLoading: false
   }),

   actions: {
      setUser(name, id){
         this.user.username = name
         this.user.id = id
      },
      setAuth(bool){
         this.isAuth = bool
      },
      setLoading(bool){
         this.isLoading = bool
      },

      async login(username, password){
         try {
            const res = await AuthService.login(username, password)
            localStorage.setItem('token', res.data.accessToken)
            this.setAuth(true)
            this.setUser(res.data.username, res.data.user_id)
            router.push('/home')
         } catch (err) {
            console.log(err.res?.data?.message);
         }
      },
      async registration(username, password){
         try {
            const res = await AuthService.registration(username, password)
            console.log(res);
            localStorage.setItem('token', res.data.accessToken)
            this.setAuth(true)
            this.setUser(res.data.username, res.data.user_id)
         } catch (err) {
            console.log(err.res?.data?.message);
         }
      },
      async logout(){
         try {
            const res = await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({})
            router.push('/login')
         } catch (err) {
            console.log(err.res?.data?.message);
         }
      },

      async checkAuth(){
         this.setLoading(true)
         try {
            const res = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
            console.log(res);
            localStorage.setItem('token', res.data.accessToken)
            this.setAuth(true)
            this.setUser(res.data.username, res.data.user_id)
         } catch (err) {
            console.log(err.res?.data?.message);
         } finally{
            this.setLoading(false)
         }
      }
   }
});