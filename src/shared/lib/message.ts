export const postMessageToPlugin = <T>(msg: T) => {
	console.log("Message to plugin:", msg);
	parent.postMessage({ pluginMessage: msg }, "*");
};

export const postMessageToUI = <T>(msg: T) => {
	console.log("Message to UI:", msg);
	figma.ui.postMessage(msg);
};
