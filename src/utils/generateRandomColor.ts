import { getHexNumber } from "./getHexNumber";
import { generateRandomNumber } from "./generateRandomNumber";

export const generateRandomColor = (): number => {
  const red = generateRandomNumber(256);
  const green = generateRandomNumber(256);
  const blue = generateRandomNumber(256);

  const redHex = red.toString(16).padStart(2, "0");
  const greenHex = green.toString(16).padStart(2, "0");
  const blueHex = blue.toString(16).padStart(2, "0");
  const color = `${redHex}${greenHex}${blueHex}`;

  return getHexNumber(color);
};
