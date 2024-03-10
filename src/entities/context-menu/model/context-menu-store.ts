import { writable } from "svelte/store";

type ContextMenuStore = {
	isOpen: boolean;
	x: number;
	y: number;
	options: {
		label: string;
		fn: () => void;
	}[];
};

const initContextMenuStore: ContextMenuStore = {
	isOpen: false,
	x: 0,
	y: 0,
	options: [],
};

export const contextMenuStore =
	writable<ContextMenuStore>(initContextMenuStore);
