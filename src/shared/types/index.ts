import type { NAVIGATION } from "@/shared/constants/navigation";

export type NavPage = keyof typeof NAVIGATION;

export type {
	GetDesignLocalPaintStylesQuery,
	GetDesignLocalPaintStylesResponse,
	GetDesignLocalTextStylesQuery,
	GetDesignLocalTextStylesResponse,
	GetSettingsQuery,
	GetSettingsResponse,
	MessageToPlugin,
	MessageToUI,
	MessageToUIEvent,
	ResetPluginDataMessage,
	SelectedNodeChangeMessage,
	SetSettingsQuery,
} from "./dto";
export { Unit } from "./styles";
export type { LocalTextStyle, NodeBlock, NodeCSS } from "./styles";

export type Mutable<Type> = {
	-readonly [Key in keyof Type]: Type[Key];
};

export type { Lang, Settings, CSSPreprocessor } from "./settings";
