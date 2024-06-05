<template>
  <loader-overlay v-model:isLoading="isLoading"></loader-overlay>
  <main-page></main-page>
</template>

<script lang="ts">
import MainPage from "@/pages/MainPage.vue";

export default {
  components: { MainPage },
  data() {
    return {
      isLoading: true,
    };
  },
};
</script>

<style>
:root {
  --main-color: #546fff;
  --main-font-color: #141522;
  --main-light: #ffffff;

  --color-accent: #dce4ff;
  --color-accent-2: #98abff;

  --transition-t: 0.3s;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  color: var(--main-font-color);
}

button {
  padding: 0;
  font-family: Arial, sans-serif;
  color: var(--main-font-color);
  border: none;
  cursor: pointer;
}

h1,
p {
  margin: 0;
}

.df-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.full-size {
  width: 100%;
  height: 100%;
}
</style>
