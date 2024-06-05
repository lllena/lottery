<template>
  <div class="wrapper">
    <p class="text">Randow Number</p>
    <p>
      <strong class="strong">{{ randomNumber }}</strong>
    </p>
  </div>
</template>

<script lang="ts">
import { Event } from "@/types/events";
import { defineComponent } from "vue";
import { generateRandomNumber } from "@/utils";

interface IRandomNumberGeneratorData {
  randomNumber: number | null;
}

export default defineComponent({
  name: "random-number-generator",
  data(): IRandomNumberGeneratorData {
    return {
      randomNumber: null,
    };
  },
  mounted() {
    const randomNumber = generateRandomNumber(10) + 1;
    this.randomNumber = randomNumber;
    this.$emit(Event.RandomNumberGenerated, randomNumber);
  },
});
</script>

<style scoped>
.wrapper {
  gap: 20px;
}

.text {
  font-size: 12px;
  line-height: 18px;
  color: var(--main-font-color);
}

.strong {
  display: block;
  font-size: 50px;
  font-weight: 700;
  color: var(--main-color);
  margin-top: 10px;
}
</style>
