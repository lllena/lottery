<template>
  <my-dialog :isOpen="isOpen">
    <div class="df-center wrapper">
      <p class="text">{{ message }}</p>
      <div class="df-center wrapper-btn">
        <my-button @click="submitAction(true)"> Confirm</my-button>
        <my-button
          v-if="showCancel"
          type="outline"
          @click="submitAction(false)"
        >
          Cancel
        </my-button>
      </div>
    </div>
  </my-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Event } from "@/types/events";
import MyButton from "@/components/UI/MyButton.vue";
import MyDialog from "@/components/UI/MyDialog.vue";

export default defineComponent({
  name: "action-dialog",
  components: { MyDialog, MyButton },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    submitAction(value: boolean) {
      this.$emit(Event.Action, value);
      this.$emit("update:isOpen", false);
    },
  },
});
</script>

<style scoped>
.wrapper {
  flex: 1;
  flex-direction: column;
  gap: 40px;
  padding: 20px;
}

.wrapper-btn {
  gap: 20px;
}

.text {
  font-size: 16px;
  color: var(--main-font-color);
  text-align: center;
}
</style>
