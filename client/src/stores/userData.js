import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import axiosI from "../axios/instance.js";

export const useUserDataStore = defineStore("dataUser", () => {
  const dataUsuario = reactive({
    id: "",
    usuario: "",
    correo: "",
  });

  const btnUser = ref(false);

  async function getData() {
    try {
      const res = await axiosI.get("/user/verify");
      dataUsuario.id = res.data.id;
      dataUsuario.usuario = res.data.usuario;
      dataUsuario.correo = res.data.correo;
      btnUser.value = true;
    } catch (error) {
      // console.log(error);
      if (error.response.status == 401) console.log("Inicie sesión!!");
    }
  }

  getData();

  return { dataUsuario, getData, btnUser };
});
