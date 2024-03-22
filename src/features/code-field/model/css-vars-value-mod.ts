import { noModificationFunc } from "./no-modification-func";

export const cssVarsValueMod = (needReplace: boolean) => {
	if (!needReplace) return noModificationFunc;

	return (s: string): string => {
		return s.replace(/var\(--.+, .+\)/, (match) => {
			const matchArr = match.split("");
			const startIndex = matchArr.findIndex((ch) => ch === ",") + 1;
			const endIndex = matchArr.findIndex((ch) => ch === ")");

			return match.slice(startIndex, endIndex);
		});
	};
};
