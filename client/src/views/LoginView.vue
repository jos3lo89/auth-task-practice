<script setup>
import { useRouter } from "vue-router";
import { reactive } from "vue";
import axiosI from "../axios/instance.js";

const router = useRouter();

const dataUserLogin = reactive({
  correo: "",
  clave: "",
});

const loginUser = async () => {
  try {
    const res = await axiosI.post("/user/login", dataUserLogin);
    console.log(res);
    router.push({ name: "home" });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="text-center">
    <h1 class="text-2xl m-2">Iniciar sesión</h1>
  </div>
  <section class="flex flex-col justify-center items-center space-y-3">
    <input
      v-model="dataUserLogin.correo"
      class="outline-none border-none p-2 m-2 rounded-lg bg-slate-800"
      type="text"
      placeholder="Correo"
      autocomplete="off"
    />
    <input
      v-model="dataUserLogin.clave"
      class="outline-none border-none p-2 m-2 rounded-lg bg-slate-800"
      type="password"
      placeholder="Contraseña"
      autocomplete="off"
    />
    <div>
      <button
        @click="loginUser()"
        class="border-none bg-blue-600 p-2 m-2 rounded-lg hover:bg-blue-500"
      >
        Ingresar
      </button>
    </div>
  </section>
</template>

<style scoped></style>
