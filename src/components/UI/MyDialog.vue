<template>
  <div v-if="isOpen" class="df-center full-size dialog" @click="hideDialog">
    <div class="content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "my-dialog",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    hideDialog() {
      this.$emit("update:isOpen", false);
    },
  },
});
</script>
<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  z-index: 10;
}

.content {
  display: flex;
  background-color: var(--main-light);
  min-width: 300px;
  min-height: 200px;
  border-radius: 10px;
  overflow: hidden;
  animation-name: popUp;
  animation-duration: var(--transition-t);
}

@keyframes popUp {
  from {
    transform: scale(50%);
  }

  to {
    transform: scale(100%);
  }
}
</style>
