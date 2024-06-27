<template>
  <wrapperUI v-if="errorLog">
    <p>Error! {{errorLog}}</p>
    <defaultButton @click="router.back">Back</defaultButton>
  </wrapperUI>

  <wrapperUI v-if="isAddTask">
    <p class="bg-white text-lime-700 p-2">WASSUP!</p>
    <div class="max-w-7xl w-full flex flex-col items-center gap-4">
      <input v-model="userTaskInput" type="text" class="w-full p-2 bg-white border border-lime-900" placeholder="task title:">
      <input @keydown.enter="addTask" v-model="userDescriptionInput" type="text" class="w-full p-2 bg-white border border-lime-900" placeholder="task description:">
      <defaultButton @click="addTask">Done</defaultButton>
      <defaultButton @click="isAddTask = false">Back</defaultButton>
    </div>
  </wrapperUI>
  <wrapperUI v-if="isLoad">
    <p>Loading...</p>
  </wrapperUI>
  <wrapperUI v-else>
    <p class="bg-white text-lime-700 p-2">WASSUP, {{username}}!</p>
    <div class="flex flex-col items-center gap-4 overflow-y-auto max-w-7xl w-full">
      <div v-for="(t, index) in tasks" :key="index" class="flex flex-row items-center w-full justify-between px-4 py-2 border-2 border-white text-white" :class="t.is_completed ? 'bg-lime-900 text-gray-400' : ''">
        <div class="flex flex-col items-start">
          <p class="text-xl font-bold">{{t.title}}</p>
          <p>{{t.description}}</p>
        </div>
        <div class="flex flex-row items-center gap-4">
          <input :checked="t.is_completed" type="checkbox" class="w-8 h-8" @change="updateTask(t.is_completed = !t.is_completed, t.id)" />
          <defaultButton @click="deleteTask(t.id)">Delete</defaultButton>
        </div>
      </div>
    </div>
    <defaultButton @click="isAddTask = true" class="p-3">Add task</defaultButton>
    <defaultButton @click="logoutUser">Log out</defaultButton>
  </wrapperUI>
</template>

<script setup>
import TaskService from '../services/TaskService';
import { ref, onMounted, watchEffect } from 'vue';
import router from '../router';
import { useDataStore } from '../store/store';
import wrapperUI from '../components/wrapperUI.vue';
import defaultButton from '../components/defaultButton.vue';
import UserService from '../services/UserService';

const data = ref(null)
const tasks = ref([])
const userTaskInput = ref('')
const userDescriptionInput = ref('')
const isAddTask = ref(false)
const dataStore = useDataStore()
const isLoad = ref(false)
const username = ref(null)
const errorLog = ref(null)

function logoutUser(){
  const isConfirm = confirm('You sure?')
  if(confirm) dataStore.logout()
}

async function getTasks(){
  isLoad.value = true
  try {
    const {data} = await TaskService.getUserTasks()
    tasks.value = data.rows
  } catch (err) {
    console.error(err);
    errorLog.value = err.response.data.message
  } 
  finally {
    isLoad.value = false
  }
}

async function addTask(){
  try {
    const res = await TaskService.addTask(userTaskInput.value, userDescriptionInput.value)
    if(res.status === 200){
      isAddTask.value = false
      userTaskInput.value = ''
      userDescriptionInput.value = ''
      getTasks()
    }
  } catch (err) {
    console.log(err);
    errorLog.value = err.response.data.message
  }
}

async function deleteTask(id){
  const isConfirm = confirm('Are you sure you want to delete this task?')
  if(isConfirm){
    try {
      const res = await TaskService.deleteTask(id)
      console.log(res);
    } catch (err) {
      console.log(err);
      errorLog.value = err.response.data.message
    } finally{
      getTasks()
    }
  }
}

async function updateTask(bool, id){
  try {
    const res = await TaskService.updateTask(id, bool)
    console.log(res);
  } catch (err) {
    console.log(err);
    errorLog.value = err.response.data.message
  }
}

onMounted(() => {
  getTasks()
})
watchEffect(() => {
  username.value = dataStore.user.username
})
</script>

<style>

</style>