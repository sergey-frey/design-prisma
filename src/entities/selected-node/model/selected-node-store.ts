import type { NodeBlock, NodeCSS } from "@/shared/types";
import { writable } from "svelte/store";

type SelectedNodeStore = {
	nodeId: string;
	nodeName: string;
	nodeBlock: NodeBlock;
	nodeCSS: NodeCSS;
	nodeSVG: string | undefined;
	nodeText: string;
};

const initSelectedNodeStore: SelectedNodeStore = {
	nodeId: "",
	nodeName: "",
	nodeBlock: {
		width: 0,
		height: 0,
	},
	nodeCSS: {},
	nodeSVG: undefined,
	nodeText: "",
};

export const selectedNodeStore = writable<SelectedNodeStore>(
	initSelectedNodeStore,
);
