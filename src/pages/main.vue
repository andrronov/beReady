<template>
  <wrapperUI>
    <p v-if="dataStore.isAuth">Yes!!! {{ dataStore.user }}</p>
    <p v-else>No!!!</p>
    <button @click="logoutUser">Log out</button>
  </wrapperUI>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, watchEffect } from 'vue';
import router from '../router';
import { useDataStore } from '../store/store';
import wrapperUI from '../components/wrapperUI.vue';

const data = ref(null)
const dataStore = useDataStore()

function logoutUser(){
  dataStore.logout()
}
</script>

<style>

</style>