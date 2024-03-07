<script setup>
import { RouterLink } from "vue-router";
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
    <div class="flex space-x-3"></div>
  </header>
</template>

<style scoped></style>
