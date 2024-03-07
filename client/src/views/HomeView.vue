<script setup>
import { onMounted, reactive, ref } from "vue";
import axiosI from "../axios/instance.js";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

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
    if (res.status == 201) {
      toast.success("tarea creada", {
        autoClose: 1000,
        theme: "light",
        closeOnClick: true,
        transition: toast.TRANSITIONS.SLIDE,
      });
    }
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

const deleteTask = async (id) => {
  try {
    const res = await axiosI.delete(`/task/delete/${id}`);
    getTasks();
    if (res.status == 204) {
      toast.warn("tarea borrada", {
        autoClose: 1000,
        theme: "light",
        closeOnClick: true,
        transition: toast.TRANSITIONS.SLIDE,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const openCardUpdate = ref(false);

const dataFoundTaskUpdate = reactive({
  titulo: "",
  descripcion: "",
});

const idTaskUpdate = ref(null);

const openUpdateCard = async (id) => {
  openCardUpdate.value = !openCardUpdate.value;
  try {
    const res = await axiosI.get(`/task/found/${id}`);
    dataFoundTaskUpdate.titulo = res.data.titulo;
    dataFoundTaskUpdate.descripcion = res.data.descripcion;
    idTaskUpdate.value = res.data._id;
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (id) => {
  try {
    const res = await axiosI.put(`/task/update/${id}`, dataFoundTaskUpdate);
    dataFoundTaskUpdate.titulo = "";
    dataFoundTaskUpdate.descripcion = "";
    getTasks();
    openCardUpdate.value = !openCardUpdate.value;
    if (res.status == 200) {
      toast.success("tarea actualizada", {
        autoClose: 1000,
        theme: "light",
        closeOnClick: true,
        transition: toast.TRANSITIONS.SLIDE,
      });
    }
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
      <button
        @click="deleteTask(task._id)"
        class="bg-indigo-600 p-1 rounded-lg m-2"
      >
        borrar
      </button>
      <button
        @click="openUpdateCard(task._id)"
        class="bg-gray-600 p-1 rounded-lg m-2"
      >
        Actuliazar
      </button>
    </div>
  </section>

  <div
    v-if="openCardUpdate"
    class="bg-slate-700 fixed top-[18%] left-[50%] translate-x-[-50%] p-4 space-y-3 rounded-md shadow-md"
  >
    <input
      v-model="dataFoundTaskUpdate.titulo"
      type="text"
      placeholder="Titulo"
      autocomplete="off"
      class="bg-slate-800 outline-none border-none p-1 rounded-lg block"
    />
    <input
      v-model="dataFoundTaskUpdate.descripcion"
      type="text"
      placeholder="Descripción"
      autocomplete="off"
      class="bg-slate-800 outline-none border-none p-1 rounded-lg block"
    />
    <div class="text-center">
      <button
        @click="updateTask(idTaskUpdate)"
        class="bg-blue-600 p-1 rounded-md m-2"
      >
        actulizar
      </button>
      <button
        @click="openCardUpdate = !openCardUpdate"
        class="bg-orange-600 p-1 rounded-md m-2"
      >
        cerrar
      </button>
    </div>
  </div>
</template>
