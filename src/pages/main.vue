<template>
  <div class="w-full h-screen flex flex-col items-center justify-center gap-8 bg-lime-700 text-xl">
    main
  </div>
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