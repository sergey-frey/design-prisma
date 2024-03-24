import { pipe } from "@/shared/utils";
import type { NodeCSS, Settings } from "@/shared/types";
import { commentsValueMod } from "./comments-value-mod";
import { cssVarsValueMod } from "./css-vars-value-mod";
import { scssRuleMod } from "./scss-rule-mod";
import { unitsValueMod } from "./units-value-mod";
import { scssValueMod } from "./scss-value-mod";

export const applyModifications = (
	code: NodeCSS,
	settings: Settings,
): NodeCSS => {
	const result: NodeCSS = {};

	for (const rule of Object.keys(code) as Array<keyof NodeCSS>) {
		if (code[rule] === undefined) continue;

		const newRule = pipe(String(rule), [
			scssRuleMod(settings.preprocessor === "scss"),
		]);
		result[newRule] = pipe(code[rule], [
			cssVarsValueMod(settings.disableDesignVariables),
			commentsValueMod(settings.disableCodeComments),
			unitsValueMod(settings.units),
			scssValueMod(settings.preprocessor === "scss"),
		]);
	}

	return result;
};
