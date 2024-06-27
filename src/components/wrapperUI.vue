<template>
   <div class="w-full h-screen flex flex-col items-center justify-center gap-8 bg-lime-700 text-xl py-2">
      <slot></slot>
   </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { watchEffect } from 'vue';
import { useDataStore } from '../store/store';

const router = useRouter()
const route = useRoute()
const dataStore = useDataStore()

watchEffect(() => {
  if(localStorage.getItem('token') && route.path !== '/login'){
    dataStore.checkAuth()
  } else {
   router.push('/login')
  }

  if(route.path === '/login' && dataStore.isAuth) router.push('/home')
})
</script>
