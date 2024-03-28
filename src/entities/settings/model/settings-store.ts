import { INIT_SETTINGS } from "@/shared/constants";
import type { Settings } from "@/shared/types";
import { writable } from "svelte/store";

export const settingsStore = writable<Settings>(INIT_SETTINGS);
