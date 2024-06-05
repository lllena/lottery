<template>
  <div class="container" ref="container"></div>
</template>

<script lang="ts">
import * as PIXI from "pixi.js";
import { defineComponent, ref, onMounted } from "vue";
import { Emitter } from "@pixi/particle-emitter";

export default defineComponent({
  name: "animated-background",
  setup() {
    const container = ref<HTMLElement | null>(null);

    onMounted(() => {
      if (container?.value) {
        const app = new PIXI.Application({
          resizeTo: container.value,
          backgroundAlpha: 0,
        });
        const stage = new PIXI.Container();
        app.stage.addChild(stage);

        const particleContainer = new PIXI.ParticleContainer();
        stage.addChild(particleContainer);

        container?.value?.appendChild(app.view as HTMLCanvasElement);

        const emitter = new Emitter(particleContainer, {
          lifetime: {
            min: 5,
            max: 25,
          },
          frequency: 0.005,
          spawnChance: 1,
          particlesPerWave: 5,
          emitterLifetime: -1,
          maxParticles: 20,
          pos: {
            x: 0,
            y: 0,
          },
          addAtBack: false,
          behaviors: [
            {
              type: "alpha",
              config: {
                alpha: {
                  list: [
                    {
                      value: 0.8,
                      time: 0,
                    },
                    {
                      value: 0.1,
                      time: 1,
                    },
                  ],
                  isStepped: false,
                },
              },
            },
            {
              type: "scale",
              config: {
                scale: {
                  list: [
                    {
                      value: 0.2,
                      time: 0,
                    },
                    {
                      value: 0.1,
                      time: 1,
                    },
                  ],
                  isStepped: false,
                },
              },
            },
            {
              type: "moveSpeed",
              config: {
                speed: {
                  list: [
                    {
                      value: 200,
                      time: 0,
                    },
                    {
                      value: 400,
                      time: 1,
                    },
                  ],
                  isStepped: false,
                },
              },
            },
            {
              type: "rotationStatic",
              config: {
                min: 0,
                max: 360,
              },
            },
            {
              type: "spawnShape",
              config: {
                type: "rect",
                data: {
                  x: 0,
                  y: 0,
                  w: window.innerWidth,
                  h: 0,
                },
              },
            },
            {
              type: "textureSingle",
              config: {
                texture: PIXI.Texture.from("coin.png"),
              },
            },
          ],
        });

        let elapsed = Date.now();

        const update = function () {
          requestAnimationFrame(update);

          let now = Date.now();
          emitter.update((now - elapsed) * 0.0005);
          elapsed = now;
        };

        update();
      }
    });

    return {
      container,
    };
  },
});
</script>

<style scoped>
div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}
</style>
