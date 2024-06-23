<template>
  <div v-if="!isRegister" class="w-full h-screen flex flex-col items-center justify-center gap-8 bg-lime-700 text-xl">
    <p class="bg-white text-lime-700 p-2">WASSUP!</p>
    <input type="text" placeholder="username" v-model="username" class="bg-white text-lime-700 p-2">
    <input type="password" placeholder="password" v-model="userPassword" class="bg-white text-lime-700 p-2">
    <button @click="registerUser" class="bg-white text-lime-700 p-2">Log In</button>
    <button @click="isRegister = true" class="bg-gray-100 text-lime-800 p-1">Register</button>
  </div>

  <div v-else class="w-full h-screen flex flex-col items-center justify-center gap-8 bg-lime-700 text-xl">
    <p class="bg-white text-lime-700 p-2">WASSUP!</p>
    <input type="text" placeholder="username" v-model="username" class="bg-white text-lime-700 p-2">
    <input type="password" placeholder="password" v-model="userPassword" class="bg-white text-lime-700 p-2">
    <button @click="registerUser" class="bg-white text-lime-700 p-2">Register</button>
    <button @click="isRegister = false" class="bg-gray-100 text-lime-800 p-1">Log In</button>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue';

const isRegister = ref(false)
const username = ref(null)
const userPassword = ref(null)

async function registerUser(){
  try{
      const res = await axios.post(import.meta.env.VITE_HOST + '/api/register-user', {
      "username": username.value,
      "password": userPassword.value
    })

    console.log(res);
  } catch(err){
    console.error('err in post', err)
  }
  
}
</script>

<style>

</style>