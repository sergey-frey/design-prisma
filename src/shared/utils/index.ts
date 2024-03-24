import type { MessageToPlugin, MessageToUI } from "../types";
import { Observer } from "./observer";

export const msgToUIObserver = new Observer<MessageToUI>();
export const msgToPluginObserver = new Observer<MessageToPlugin>();

export { copyToClipboard } from "./clipboard";
export {
	figmaRGBToHEX,
	formatStyles,
	normalizeSeparatedStyle,
	paintStyleNameToCSSVar,
	pxToRem,
} from "./convert";
export { logger } from "./logger";
export { postMessageToPlugin, postMessageToUI } from "./message";
export { pipe, type PipeModification } from "./pipe";
export { sortByField, toTitle } from "./string";
