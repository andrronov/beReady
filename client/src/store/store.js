import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import axios from "axios";
import AuthService from "@/services/AuthService.js";
import { API_URL } from "@/settings/axios.js";
import router from "@/router.js";

export const useDataStore = defineStore("data", () => {
  const user = useLocalStorage("user", {});
  const token = useLocalStorage("token", "");
  const logged = computed(() => user.value.id !== undefined);
  const loading = ref(false);

  const login = async (username, password) => {
    try {
      loading.value = true;
      const res = await AuthService.login(username, password);
      console.log(res.data);
      token.value = res.data.accessToken;
      user.value = {
        username: res.data.username,
        id: res.data.user_id,
      };
      router.push({ name: "home" });
      return res;
    } catch (err) {
      console.log(err);
      return err;
    } finally {
      loading.value = false;
    }
  };

  const registration = async (username, password) => {
    try {
      loading.value = true;
      const res = await AuthService.registration(username, password);
      token.value = res.data.accessToken;
      user.value = {
        username: res.data.username,
        id: res.data.user_id,
      };
      router.push({ name: "home" });
      return res;
    } catch (err) {
      console.log(err.res?.data?.message);
      return err;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      token.value = "";
      user.value = {};
      router.push("/login");
    } catch (err) {
      console.log(err.res?.data?.message);
    }
  };

  const checkAuth = async () => {
    try {
      loading.value = true;
      const res = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      if (!res.data.accessToken) return;
      token.value = res.data.accessToken;
      user.value = {
        username: res.data.username,
        id: res.data.user_id,
      };
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    logged,
    loading,
    login,
    registration,
    logout,
    checkAuth,
  };
});
