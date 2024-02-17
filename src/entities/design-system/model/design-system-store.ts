import type { LocalTextStyle, NodeCSS } from "@/shared/types";
import { writable } from "svelte/store";

type DesignSystemStore = {
	textStyles: LocalTextStyle[];
	paintStyles: NodeCSS;
};

const initDesignSystemStore: DesignSystemStore = {
	textStyles: [],
	paintStyles: {},
};

export const designSystemStore = writable<DesignSystemStore>(
	initDesignSystemStore,
);
