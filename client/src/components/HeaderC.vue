<script setup>
import { RouterLink, useRouter } from "vue-router";
import axiosI from "../axios/instance.js";
// import { reactive } from "vue";
import { useUserDataStore } from "../stores/userData.js";

const dataStore = useUserDataStore();
const router = useRouter();

// const dataUser = reactive({
//   usuario: "",
//   correo: "",
// });

// const getDataUser = async () => {
//   {
//     try {
//       const res = await axiosI.get("/user/verify");
//       dataUser.usuario = res.data.usuario;
//       dataUser.correo = res.data.correo;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };

const logoutSesion = async () => {
  try {
    await axiosI.post("/user/logout");
    dataStore.getData();
    router.push({ name: "login" });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <header class="bg-slate-800 p-4 flex flex-row justify-around">
    <nav class="space-x-4">
      <RouterLink class="text-xl hover:text-orange-600" :to="{ name: 'home' }"
        >Home</RouterLink
      >
      <RouterLink class="text-xl hover:text-orange-600" :to="{ name: 'login' }"
        >login</RouterLink
      >
      <RouterLink
        class="text-xl hover:text-orange-600"
        :to="{ name: 'register' }"
        >register</RouterLink
      >
    </nav>
    <div class="flex space-x-3">
      <p v-show="dataStore.btnUser">
        <span class="text-orange-600">Hola:</span>
        {{ dataStore.dataUsuario.usuario }}
      </p>
      <button
        v-if="dataStore.btnUser"
        @click="logoutSesion()"
        class="bg-red-600 p-1 rounded-l"
      >
        cerrar sesión
      </button>
      <button
        v-else-if="!dataStore.btnUser"
        @click="router.push({ name: 'login' })"
        class="bg-blue-600 p-1 rounded-l"
      >
        iniciar sesión
      </button>
    </div>
  </header>
</template>

<style scoped></style>
