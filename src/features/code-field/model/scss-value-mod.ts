import { noModificationFunc } from "./no-modification-func";

export const scssValueMod = (needMode: boolean) => {
	if (!needMode) return noModificationFunc;

	return (s: string): string => {
		return s.replace(/var\(--.+, .+\)/, (match) => {
			let result = match.replace("var(--", "$");
			const endIndex = result.split("").findIndex((ch) => ch === ",");
			result = result.slice(0, endIndex);

			return result;
		});
	};
};
