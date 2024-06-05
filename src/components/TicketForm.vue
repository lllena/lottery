<template>
  <div class="df-center full-size wrapper">
    <countdown-timer @timeFinished="handleSubmit" :time="15"></countdown-timer>
    <form class="df-center form" @submit.prevent="handleSubmit">
      <label class="text"
        >Try to guess the number
        <input
          v-model="guessedNumber"
          class="input"
          type="number"
          max="10"
          min="1"
        />
      </label>
      <my-button>Start</my-button>
    </form>
  </div>
</template>

<script lang="ts">
import { Event } from "@/types/events";
import { defineComponent } from "vue";

interface ITicketFormData {
  guessedNumber: number | null;
}

export default defineComponent({
  data(): ITicketFormData {
    return {
      guessedNumber: null,
    };
  },
  methods: {
    handleSubmit(): void {
      if (
        this.guessedNumber &&
        this.guessedNumber < 1 &&
        this.guessedNumber > 10
      ) {
        this.guessedNumber = 0;
      }
      this.$emit(Event.NumberSubmitted, this.guessedNumber);
    },
  },
});
</script>

<style scoped>
.wrapper {
  flex-direction: column;
}

.form {
  width: 100%;
  padding: 20px;
  flex-direction: column;
  gap: 20px;
}

.input {
  width: 80px;
  margin-top: 10px;
  font-size: 24px;
  line-height: 32px;
  color: var(--main-color);
  font-weight: 600;
  text-align: center;
}

.text {
  font-size: 12px;
  line-height: 18px;
  color: var(--main-font-color);
}
</style>
