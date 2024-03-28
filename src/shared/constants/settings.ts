import { type Settings, Unit } from "../types";

export const INIT_SETTINGS: Settings = {
	lang: "ru",
	units: Unit.px,
	hideDesignSystem: false,
	nav: "DESIGN",
	size: {
		width: 320,
		height: 550,
	},
	disableDesignVariables: false,
	disableCodeComments: true,
	preprocessor: "css",
	showWelcomeMessage: true,
};
