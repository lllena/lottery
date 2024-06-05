<template>
  <button :class="['button', buttonTypeClass]" class="df-center">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "my-button",
  props: {
    type: {
      type: String,
      default: "main",
      validator: (value: string) => ["main", "outline"].includes(value),
    },
  },
  computed: {
    buttonTypeClass(): string {
      return this.type === "outline" ? "button-outline" : "button-main";
    },
  },
});
</script>

<style scoped>
.button {
  min-width: 80px;
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  transition: var(--transition-t);
}

.button-main {
  background-color: var(--color-accent-2);
  border: 1px solid var(--color-accent-2);
  color: var(--main-light);
}

.button-main:hover,
.button-main:focus {
  background-color: var(--main-color);
}

.button-main:active {
  background-color: var(--color-accent-2);
}

.button-outline {
  background-color: var(--color-accent);
  border: 1px solid var(--color-accent);
  color: var(--main-font-color);
}

.button-outline:hover,
.button-outline:focus {
  background-color: var(--color-accent-2);
  color: var(--main-light);
}

.button-outline:active {
  background-color: var(--color-accent);
  color: var(--main-light);
}
</style>
