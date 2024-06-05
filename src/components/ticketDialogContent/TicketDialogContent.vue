<template>
  <template v-if="result">
    <win-content></win-content>
  </template>
  <template v-else>
    <lose-content></lose-content>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoseContent from "./LoseContent.vue";
import WinContent from "./WinContent.vue";

export default defineComponent({
  components: { LoseContent, WinContent },
  props: {
    result: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style></style>
