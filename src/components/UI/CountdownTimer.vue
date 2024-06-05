<template>
  <p class="text">{{ formattedTime }}</p>
</template>

<script lang="ts">
import { Event } from "@/types/events";
import { defineComponent } from "vue";

interface ICountdownTimerData {
  remainingTime: number;
  interval: number | null;
}

export default defineComponent({
  name: "countdown-timer",
  props: {
    time: {
      type: Number,
      required: true,
    },
  },
  data(): ICountdownTimerData {
    return {
      remainingTime: this.time,
      interval: null,
    };
  },
  computed: {
    formattedTime(): string {
      const minutes = Math.floor(this.remainingTime / 60);
      const seconds = this.remainingTime % 60;
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    },
  },
  methods: {
    updateTimer(): void {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        this.$emit(Event.TimeFinished);
        if (this.interval !== null) {
          clearInterval(this.interval);
        }
      }
    },
  },
  mounted() {
    this.interval = setInterval(this.updateTimer, 1000);
  },
  beforeUnmount() {
    if (this.interval !== null) {
      clearInterval(this.interval);
    }
  },
});
</script>

<style scoped>
.text {
  font-size: 20px;
  font-weight: 600;
  line-height: 18px;
  color: var(--main-color);
}
</style>
