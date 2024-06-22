<template>
  main
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue';

const data = ref(null)

onMounted(async () => {
   const res = await axios.get(import.meta.env.VITE_HOST + '/api/users');
   data.value = res
   console.log(res.data)
})
</script>

<style>

</style>