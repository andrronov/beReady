<script setup>
import TaskService from "@/services/TaskService";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDataStore } from "@/store/store";
import { Button, Wrapper } from "@/components";

const router = useRouter();

const tasks = ref([]);
const userTaskInput = ref("");
const userDescriptionInput = ref("");
const isAddTask = ref(false);
const dataStore = useDataStore();
const isLoading = ref(false);
const errorLog = ref(null);

function handleError(err) {
  console.error(err);
  errorLog.value =
    err.response?.data?.message || "An unexpected error occurred.";
}

function logoutUser() {
  const isConfirm = confirm("Are you sure you want to log out?");
  if (isConfirm) dataStore.logout();
}

async function getTasks() {
  isLoading.value = true;
  errorLog.value = null;
  try {
    const { data } = await TaskService.getUserTasks();
    tasks.value = data.rows;
  } catch (err) {
    handleError(err);
  } finally {
    isLoading.value = false;
  }
}

async function addTask() {
  errorLog.value = null;
  if (!userTaskInput.value.trim()) {
    errorLog.value = "Task title cannot be empty.";
    return;
  }

  try {
    const res = await TaskService.addTask(
      userTaskInput.value,
      userDescriptionInput.value,
    );
    if (res.status === 200) {
      isAddTask.value = false;
      userTaskInput.value = "";
      userDescriptionInput.value = "";
      await getTasks();
    }
  } catch (err) {
    handleError(err);
  }
}

async function deleteTask(id) {
  const isConfirm = confirm("Are you sure you want to delete this task?");
  if (!isConfirm) return;
  errorLog.value = null;
  try {
    await TaskService.deleteTask(id);
    await getTasks();
  } catch (err) {
    handleError(err);
  }
}

async function toggleTaskCompletion(task) {
  errorLog.value = null;
  try {
    task.is_completed = !task.is_completed;
    await TaskService.updateTask(task.id, task.is_completed);
  } catch (err) {
    task.is_completed = !task.is_completed;
    handleError(err);
  }
}

onMounted(() => {
  getTasks();
});
</script>

<template>
  <Wrapper v-if="errorLog">
    <p class="text-red-500 text-center text-lg">Error: {{ errorLog }}</p>
    <Button @click="errorLog = null">Back</Button>
  </Wrapper>

  <Wrapper v-else-if="isAddTask">
    <p class="bg-white text-lime-700 p-2">Add New Task</p>
    <div class="max-w-7xl w-full flex flex-col items-center gap-4">
      <input
        v-model="userTaskInput"
        type="text"
        class="w-full p-2 bg-white border border-lime-900"
        placeholder="task title:"
      />
      <input
        @keydown.enter="addTask"
        v-model="userDescriptionInput"
        type="text"
        class="w-full p-2 bg-white border border-lime-900"
        placeholder="task description (optional):"
      />
      <Button @click="addTask">Done</Button>
      <Button @click="isAddTask = false">Back</Button>
    </div>
  </Wrapper>
  <Wrapper v-else-if="isLoading">
    <p class="text-white text-center text-lg">Loading tasks...</p>
  </Wrapper>
  <Wrapper v-else>
    <p class="bg-white text-lime-700 p-2">
      WASSUP, {{ dataStore.user?.username || "Guest" }}!
    </p>
    <div
      class="flex flex-col items-center gap-4 overflow-y-auto max-w-7xl w-full"
    >
      <p v-if="tasks.length === 0" class="text-white text-lg">
        No tasks yet. Add one!
      </p>
      <div
        v-for="task in tasks"
        :key="task.id"
        class="flex flex-row items-center w-full justify-between px-4 py-2 border-2 border-white text-white"
        :class="task.is_completed ? 'bg-lime-900 text-gray-400' : ''"
      >
        <div class="flex flex-col items-start">
          <p class="text-xl font-bold">{{ task.title }}</p>
          <p>{{ task.description }}</p>
        </div>
        <div class="flex flex-row items-center gap-4">
          <input
            :checked="task.is_completed"
            type="checkbox"
            class="w-8 h-8"
            @change="toggleTaskCompletion(task)"
          />
          <Button @click="deleteTask(task.id)">Delete</Button>
        </div>
      </div>
    </div>
    <Button @click="isAddTask = true" class="p-3">Add task</Button>
    <Button @click="logoutUser">Log out</Button>
  </Wrapper>
</template>
