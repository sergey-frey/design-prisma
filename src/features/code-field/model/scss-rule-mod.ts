import { noModificationFunc } from "./no-modification-func";

export const scssRuleMod = (needFormat: boolean) => {
	if (!needFormat) return noModificationFunc;

	return (r: string): string => {
		return r.replace(/^--/, "$");
	};
};
