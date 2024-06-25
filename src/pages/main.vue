<template>
  <div class="w-full h-screen flex flex-col items-center justify-center gap-8 bg-lime-700 text-xl">
    main
    <p v-if="dataStore.isAuth">Yes!!! {{ dataStore.user }}</p>
    <p v-else>No!!!</p>
    <button @click="logoutUser">Log out</button>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, watchEffect } from 'vue';
import router from '../router';
import { useDataStore } from '../store/store';

const dataStore = useDataStore()
const data = ref(null)

function logoutUser(){
  dataStore.logout()
}
</script>

<style>

</style>