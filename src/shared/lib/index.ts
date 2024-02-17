import type { MessageToPlugin, MessageToUI } from "../types";
import { Observer } from "./observer";

export const msgToUIObserver = new Observer<MessageToUI>();
export const msgToPluginObserver = new Observer<MessageToPlugin>();

export { copyToClipboard } from "./clipboard";
export {
  figmaRGBToHEX, formatStyles,
  normalizeSeparatedStyle,
  paintStyleNameToCSSVar,
  pxToRem
} from "./convert";
export { postMessageToPlugin, postMessageToUI } from "./message";
export { sortByField, toTitle } from "./string";

