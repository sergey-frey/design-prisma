import { type Settings, Unit } from "@/shared/types";
import { writable } from "svelte/store";

const initSettingsStore: Settings = {
	lang: "ru",
	units: Unit.px,
	hideDesignSystem: true,
	nav: "DESIGN",
};

export const settingsStore = writable<Settings>(initSettingsStore);
