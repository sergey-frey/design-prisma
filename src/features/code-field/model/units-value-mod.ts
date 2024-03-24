import { pxToRem } from "@/shared/utils";
import { Unit } from "@/shared/types";

export const unitsValueMod = (unit: Unit) => {
	// FIXME: Переделать по-человечески :)
	return (s: string): string => {
		if (unit === Unit.rem) {
			return s.replace(/([^\s]+)px/g, (match) => {
				return pxToRem(Number(match.slice(0, match.length - 2)), 16) + unit;
			});
		}

		return s;
	};
};
