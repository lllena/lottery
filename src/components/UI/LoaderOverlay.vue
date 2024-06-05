<template>
  <div class="df-center full-size root" v-if="isLoading">
    <div
      v-for="(char, index) in text"
      :key="index"
      class="letter"
      ref="letters"
    >
      {{ char }}
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import { generateRandomNumber } from "@/utils";

export default {
  data() {
    return {
      text: "LOTTERY",
    };
  },
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  name: "loader-overlay",
  mounted() {
    this.animateLetters();
  },
  methods: {
    animateLetters() {
      const letters = this.$refs.letters;
      gsap.set(letters, { opacity: 0, y: "-50%", rotationX: -90 });

      letters.forEach((letter, index) => {
        gsap.to(letter, {
          opacity: 1,
          y: "0%",
          rotationX: 0,
          duration: 2,
          delay: index * 0.1,
          backgroundColor: this.getRandomColor(),
          ease: "power4.out",
          onComplete: () => {
            if (letters?.length - 1 === index) {
              this.$emit("update:isLoading", false);
            }
          },
        });
      });
    },
    getRandomColor() {
      const colors = [
        "#10197A",
        "#1A2793",
        "#2A3BB7",
        "#3D53DB",
        "#546FFF",
        "#9F84FD",
        "#98ABFF",
        "#BAC8FF",
      ];
      return colors[generateRandomNumber(colors.length)];
    },
  },
};
</script>

<style scoped>
.root {
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
}

.letter {
  font-size: 48px;
  padding: 8px;
}
</style>
