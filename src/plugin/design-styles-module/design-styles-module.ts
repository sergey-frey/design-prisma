import { paintStyleNameToCSSVar } from "@/shared/utils";
import type { LocalTextStyle, NodeCSS } from "@/shared/types";
import { getPaintStyleValue } from "../code-module";

export const getLocalTextStyles = (): LocalTextStyle[] => {
	return figma.getLocalTextStyles().map((s) => ({
		fontFamily: s.fontName.family,
		fontWeight: s.fontName.style,
		fontSize: s.fontSize,
		amountOfConsumers: s.consumers.length,
	}));
};

// TODO: add gradient and other paints
export const getLocalPaintStyles = (): NodeCSS => {
	return figma.getLocalPaintStyles().reduce<NodeCSS>((acc, s) => {
		return Object.assign(acc, {
			// [paintStyleNameToCSSVar(s.name)]: s.paints.map((p) =>
			// 	getPaintStyleValue(p),
			// ),
			[paintStyleNameToCSSVar(s.name)]: getPaintStyleValue(s.paints[0]),
		});
	}, {});
};
