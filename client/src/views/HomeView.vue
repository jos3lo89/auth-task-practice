<script setup>
import { onMounted, reactive, ref } from "vue";
import axiosI from "../axios/instance.js";
import { useRouter } from "vue-router";

const router = useRouter();

const dataTask = reactive({
  titulo: "",
  descripcion: "",
});
const tasks = ref([]);

const openCard = ref(false);

const openCreateTaskCard = () => {
  openCard.value = !openCard.value;
};

const createTask = async () => {
  try {
    const res = await axiosI.post("/task/create", dataTask);
    console.log(res);
    openCreateTaskCard();
    getTasks();
    dataTask.titulo = "";
    dataTask.descripcion = "";
  } catch (error) {
    console.log(error);
  }
};

const getTasks = async () => {
  try {
    const res = await axiosI.get("/task/found");
    tasks.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getTasks();
});

const logoutSesion = async () => {
  try {
    await axiosI.post("/user/logout");
    router.push({ name: "login" });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="text-center p-4">
    <button
      @click="openCreateTaskCard()"
      class="bg-yellow-600 p-1 rounded-lg mx-2"
    >
      Crear tarea
    </button>
    <button @click="logoutSesion()" class="bg-red-600 p-1 rounded-lg mx-2">
      Cerrar sesion
    </button>
  </div>

  <div
    v-if="openCard"
    class="bg-slate-700 fixed top-[18%] left-[50%] translate-x-[-50%] p-4 space-y-3 rounded-md shadow-md"
  >
    <input
      v-model="dataTask.titulo"
      type="text"
      placeholder="Titulo"
      autocomplete="off"
      class="bg-slate-800 outline-none border-none p-1 rounded-lg block"
    />
    <input
      v-model="dataTask.descripcion"
      type="text"
      placeholder="Descripción"
      autocomplete="off"
      class="bg-slate-800 outline-none border-none p-1 rounded-lg block"
    />
    <div class="text-center">
      <button @click="createTask()" class="bg-blue-600 p-1 rounded-md">
        crear
      </button>
    </div>
  </div>

  <section class="flex flex-wrap p-4 gap-4 justify-center items-center">
    <div
      v-for="(task, i) in tasks"
      :key="i"
      class="bg-slate-800 p-2 rounded-lg"
    >
      <p><span class="text-orange-600">titulo: </span>{{ task.titulo }}</p>
      <p>
        <span class="text-orange-600">descripción</span>{{ task.descripcion }}
      </p>
    </div>
  </section>
</template>
