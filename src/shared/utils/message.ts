import { logger } from "./logger";

export const postMessageToPlugin = <T>(msg: T) => {
	logger.log("Message to plugin:", msg);
	parent.postMessage({ pluginMessage: msg }, "*");
};

export const postMessageToUI = <T>(msg: T) => {
	logger.log("Message to UI:", msg);
	figma.ui.postMessage(msg);
};
