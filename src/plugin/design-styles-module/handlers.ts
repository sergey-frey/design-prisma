import { postMessageToUI } from "@/shared/lib";
import type {
	GetDesignLocalPaintStylesResponse,
	GetDesignLocalTextStylesResponse,
	MessageToPlugin,
} from "@/shared/types";
import {
	getLocalPaintStyles,
	getLocalTextStyles,
} from "./design-styles-module";

export const handleGetDesignLocalTextStylesQuery = (msg: MessageToPlugin) => {
	if (msg.action !== "get-design-local-text-styles-query") return;

	postMessageToUI<GetDesignLocalTextStylesResponse>({
		action: "get-design-local-text-styles-response",
		textStyles: getLocalTextStyles(),
	});
};

export const handleGetDesignLocalPaintStylesQuery = (msg: MessageToPlugin) => {
	if (msg.action !== "get-design-local-paint-styles-query") return;

	postMessageToUI<GetDesignLocalPaintStylesResponse>({
		action: "get-design-local-paint-styles-response",
		paintStiles: getLocalPaintStyles(),
	});
};
