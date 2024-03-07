<script setup>
import { reactive } from "vue";
import axiosI from "../axios/instance.js";

const dataUserRegister = reactive({
  usuario: "",
  correo: "",
  clave: "",
});

const registrarUser = async () => {
  try {
    const res = await axiosI.post("/user/register", dataUserRegister);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="text-center">
    <h1 class="text-2xl m-2">Registrar</h1>
  </div>
  <section class="flex flex-col justify-center items-center space-y-3">
    <input
      v-model="dataUserRegister.usuario"
      class="outline-none border-none p-1 m-2 rounded-lg bg-slate-800"
      type="text"
      placeholder="Usuario"
      autocomplete="off"
    />
    <input
      v-model="dataUserRegister.correo"
      class="outline-none border-none p-1 m-2 rounded-lg bg-slate-800"
      type="text"
      placeholder="Correo"
      autocomplete="off"
    />
    <input
      v-model="dataUserRegister.clave"
      class="outline-none border-none p-1 m-2 rounded-lg bg-slate-800"
      type="password"
      placeholder="Contraseña"
      autocomplete="off"
    />
    <div>
      <button
        @click="registrarUser()"
        class="border-none bg-blue-600 p-1 rounded-lg hover:bg-blue-500"
      >
        Registrar
      </button>
    </div>
  </section>
</template>

<style scoped></style>
