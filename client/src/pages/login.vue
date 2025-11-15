<script setup>
import { Wrapper } from "@/components";
import { ref, computed } from "vue";
import { useDataStore } from "@/store/store";

const dataStore = useDataStore();

const isRegister = ref(false);
const username = ref("");
const userPassword = ref("");
const errorLog = ref(null);

const formTitle = computed(() => (isRegister.value ? "Register" : "Log In"));
const submitButtonText = computed(() =>
  isRegister.value ? "Register" : "Log In",
);
const toggleButtonText = computed(() =>
  isRegister.value ? "Log In" : "Register",
);

const isFormValid = computed(() => {
  return username.value.trim() !== "" && userPassword.value.trim() !== "";
});

async function handleSubmit() {
  errorLog.value = null;

  if (!isFormValid.value) {
    errorLog.value = "Username and password cannot be empty.";
    return;
  }

  let data;
  if (isRegister.value) {
    data = await dataStore.registration(username.value, userPassword.value);
  } else {
    data = await dataStore.login(username.value, userPassword.value);
  }

  if (data && data.message) {
    errorLog.value = data.message;
  }
}

function toggleMode() {
  isRegister.value = !isRegister.value;
  errorLog.value = null;
  username.value = "";
  userPassword.value = "";
}
</script>

<template>
  <Wrapper>
    <p class="bg-white text-lime-700 p-2">{{ formTitle }}!</p>
    <input
      type="text"
      placeholder="username"
      v-model="username"
      class="bg-white text-lime-700 p-2"
    />
    <input
      @keydown.enter="handleSubmit"
      type="password"
      placeholder="password"
      v-model="userPassword"
      class="bg-white text-lime-700 p-2"
    />
    <button
      @click="handleSubmit"
      :disabled="!isFormValid"
      class="bg-white text-lime-700 p-2"
    >
      {{ submitButtonText }}
    </button>
    <button @click="toggleMode" class="bg-gray-100 text-lime-800 p-1">
      {{ toggleButtonText }}
    </button>
    <p v-if="errorLog" class="bg-red-500 text-white p-2 rounded-lg">
      {{ errorLog }}
    </p>
  </Wrapper>
</template>

<style></style>
