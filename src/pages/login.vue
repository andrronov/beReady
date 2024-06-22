<template>
  login

  <input type="text" placeholder="username" v-model="username">
  <input type="password" placeholder="password" v-model="userPassword">
  <button @click="registerUser">Done</button>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue';

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