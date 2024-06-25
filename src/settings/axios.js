import axios from "axios";

export const API_URL = import.meta.env.VITE_HOST || 'http://localhost:3300/api'

const $api = axios.create({
   baseURL: API_URL,
   withCredentials: true
})

$api.interceptors.request.use((config) => {
   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
   return config
})

$api.interceptors.response.use((config) => {
   return config
}, async (error) => {
   const originalRequest = error.config
   if(error.response.status == 401 && error.config && !error.config._isRetry){
      originalRequest._isRetry = true
      try {
         const res = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
         localStorage.setItem('token', res.data.accessToken)
         return $api.request(originalRequest)
      } catch (error) {
         console.error('Not authorized');
      }
   }
   throw error
})

export default $api