<template>
  <div class="df-center wrapper">
    <p class="text">You lose</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
.wrapper {
  flex: 1;
}

.text {
  font-size: 24px;
  color: var(--main-color);
  text-align: center;
}
</style>
