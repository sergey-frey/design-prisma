import { type Settings, Unit } from "@/shared/types";
import { writable } from "svelte/store";

export const initSettingsStore: Settings = {
	lang: "ru",
	units: Unit.px,
	hideDesignSystem: true,
	nav: "DESIGN",
	size: {
		width: 400,
		height: 700,
	},
	disableDesignVariables: false,
};

export const settingsStore = writable<Settings>(initSettingsStore);
