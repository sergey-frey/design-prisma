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
	isOpen: true,
	x: 0,
	y: 0,
	options: [
		{
			label: "some button",
			fn: () => {
				alert(1);
			},
		},
	],
};

export const contextMenuStore =
	writable<ContextMenuStore>(initContextMenuStore);
