import type { NavPage } from ".";
import type { Unit } from "./styles";

export type Lang = "ru" | "en";

export type Settings = {
	lang: Lang;
	units: Unit;
	hideDesignSystem: boolean;
	nav: NavPage;
	size: {
		width: number;
		height: number;
	};
	disableDesignVariables: boolean;
	disableCodeComments: boolean;
};
