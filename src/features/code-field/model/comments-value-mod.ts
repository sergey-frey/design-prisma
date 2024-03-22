import { noModificationFunc } from "./no-modification-func";

export const commentsValueMod = (needRemove: boolean) => {
	if (!needRemove) return noModificationFunc;

	return (s: string): string => {
		return s.replace(/(\s*)\/\*(.*)\*\/(\s*)/, "");
	};
};
