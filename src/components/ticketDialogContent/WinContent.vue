<template>
  <div class="container" ref="containerRef"></div>
</template>

<script lang="ts">
import { CURRENCY_SYMBOL, WINNING_PRICE } from "@/constants/price";
import {
  generateRandomColor,
  getHexNumber,
  generateRandomNumber,
} from "@/utils";
import { defineComponent, ref, onMounted } from "vue";
import * as PIXI from "pixi.js";
import { Assets } from "@pixi/assets";

export default defineComponent({
  setup() {
    const containerRef = ref<HTMLElement | null>(null);

    const createFirework = (x: number, y: number): PIXI.Graphics => {
      const firework = new PIXI.Graphics();
      firework.beginFill(generateRandomColor());
      firework.drawCircle(2, 2, 5);
      firework.position.set(x, y);

      return firework;
    };

    const createSprite = async (x: number, y: number): Promise<PIXI.Sprite> => {
      const texture = await Assets.load({ src: "coin.png" });

      const sprite = new PIXI.Sprite(texture);
      sprite.x = x;
      sprite.y = y;
      sprite.anchor.set(0.5);

      sprite.width = 150;
      sprite.height = 150;

      return sprite;
    };

    const createTextStyle = (size = 20): PIXI.TextStyle => {
      return new PIXI.TextStyle({
        fontFamily: "Arial",
        dropShadow: true,
        dropShadowAlpha: 0.8,
        dropShadowAngle: 2.1,
        dropShadowBlur: 4,
        fill: "#ffffff",
        dropShadowColor: "#546fff",
        dropShadowDistance: 8,
        lineJoin: "round",
        fontSize: size,
        fontWeight: "lighter",
      });
    };

    onMounted(async () => {
      if (containerRef?.value) {
        const container = containerRef.value;
        const width = container?.clientWidth;
        const height = container?.clientHeight;
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        const accentColor = getHexNumber("DCE4FF");
        const fireworkInterval = 100;

        const app = new PIXI.Application({
          backgroundColor: accentColor,
          resizeTo: container,
        });

        container.appendChild(app.view as HTMLCanvasElement);

        const fireworks: PIXI.Graphics[] = [];
        const spriteCoin: PIXI.Sprite = await createSprite(
          halfWidth,
          height - 20
        );

        const addFirework = (x: number, y: number) => {
          const firework = createFirework(x, y);
          fireworks.push(firework);
          app.stage.addChild(firework);
        };

        const addSprite = async () => {
          app.stage.addChild(spriteCoin);
        };

        let elapsedTime = 0;
        app.ticker.add((delta) => {
          const deltaTime = delta * (1000 / 60);
          elapsedTime += deltaTime;

          fireworks.forEach((firework, index) => {
            firework.position.y += 5;
            firework.alpha -= 0.02;
            if (firework.alpha <= 0) {
              fireworks.splice(index, 1);
              app.stage.removeChild(firework);
            }
          });

          if (spriteCoin.y > halfHeight) {
            spriteCoin.y -= 1;
          } else {
            spriteCoin.rotation += 0.1 * delta;
          }

          if (elapsedTime >= fireworkInterval) {
            elapsedTime = 0;
            const x = generateRandomNumber(width);
            const y = generateRandomNumber(height);
            addFirework(x, y);
            addFirework(x + 5, y + 5);
          }
        });

        await addSprite();

        const textStyle = createTextStyle();
        const text = new PIXI.Text("Congratulation!", textStyle);

        text.x = halfWidth - text.width / 2;
        text.y = height - 80;

        app.stage.addChild(text);

        const headerTextStyle = createTextStyle(46);
        const headerText = new PIXI.Text(
          `You win +${WINNING_PRICE}${CURRENCY_SYMBOL}`,
          headerTextStyle
        );

        headerText.x = halfWidth - headerText.width / 2;
        headerText.y = 20;

        app.stage.addChild(headerText);
      }
    });

    return {
      containerRef,
    };
  },
});
</script>

<style scoped>
.container {
  position: relative;
  width: 500px;
  height: 400px;
  flex: 1;
}
</style>
