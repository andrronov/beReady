import axios from "axios";
import 'dotenv/config'

export const API_URL = `${process.env.VITE_HOST}/api`

const $api = axios.create({
   baseURL: API_URL,
   withCredentials: true
})

$api.interceptors.request.use((config) => {
   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
   return config
})

export default $api