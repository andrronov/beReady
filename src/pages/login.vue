<template>
  <wrapperUI v-if="!isRegister">
    <p class="bg-white text-lime-700 p-2">WASSUP!</p>
    <input type="text" placeholder="username" v-model="username" class="bg-white text-lime-700 p-2">
    <input @keydown.enter="loginUser" type="password" placeholder="password" v-model="userPassword" class="bg-white text-lime-700 p-2">
    <button @click="loginUser" class="bg-white text-lime-700 p-2">Log In</button>
    <button @click="isRegister = true" class="bg-gray-100 text-lime-800 p-1">Register</button>
  </wrapperUI>

  <wrapperUI v-else>
    <p class="bg-white text-lime-700 p-2">WASSUP!</p>
    <input type="text" placeholder="username" v-model="username" class="bg-white text-lime-700 p-2">
    <input type="password" placeholder="password" v-model="userPassword" class="bg-white text-lime-700 p-2">
    <button @click="registerUser" class="bg-white text-lime-700 p-2">Register</button>
    <button @click="isRegister = false" class="bg-gray-100 text-lime-800 p-1">Log In</button>
  </wrapperUI>
</template>

<script setup>
import wrapperUI from '../components/wrapperUI.vue';
import { ref, onMounted } from 'vue';
import { useDataStore } from '../store/store.js'

const isRegister = ref(false)
const username = ref(null)
const userPassword = ref(null)

const dataStore = useDataStore()

function loginUser() {
  dataStore.login(username.value, userPassword.value)
}
function registerUser(){
  dataStore.registration(username.value, userPassword.value)
}
</script>

<style>

</style>