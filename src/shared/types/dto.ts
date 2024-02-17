import type { LocalTextStyle, NodeBlock, NodeCSS, Settings } from ".";

type SingleQuery<T extends string> = { action: T };

export type SelectedNodeChangeMessage = {
	action: "selected-node-change";
	nodeId: string;
	nodeName: string;
	nodeCSS: NodeCSS;
	nodeBlock: NodeBlock;
	nodeSVG: string;
	nodeText: string;
};

export type GetDesignLocalTextStylesQuery =
	SingleQuery<"get-design-local-text-styles-query">;

export type GetDesignLocalTextStylesResponse = {
	action: "get-design-local-text-styles-response";
	textStyles: LocalTextStyle[];
};

export type GetDesignLocalPaintStylesQuery =
	SingleQuery<"get-design-local-paint-styles-query">;

export type GetDesignLocalPaintStylesResponse = {
	action: "get-design-local-paint-styles-response";
	paintStiles: NodeCSS;
};

export type GetSettingsQuery = SingleQuery<"get-settings-query">;

export type GetSettingsResponse = {
	action: "get-settings-response";
	settings: Settings;
};

export type SetSettingsQuery = {
	action: "set-settings-query";
	settings: Settings;
};

export type MessageToUI =
	| SelectedNodeChangeMessage
	| GetDesignLocalTextStylesResponse
	| GetDesignLocalPaintStylesResponse
	| GetSettingsResponse;

export type MessageToPlugin =
	| GetDesignLocalTextStylesQuery
	| GetDesignLocalPaintStylesQuery
	| GetSettingsQuery
	| SetSettingsQuery;

export type MessageToUIEvent = {
	data: {
		pluginMessage: MessageToUI;
	};
};
