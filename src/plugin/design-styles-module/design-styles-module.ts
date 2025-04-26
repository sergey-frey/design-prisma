import type { LocalTextStyle, NodeCSS } from "@/shared/types";
import { paintStyleNameToCSSVar } from "@/shared/utils";
import { getPaintStyleValue } from "../code-module";

export const getLocalTextStyles = async (): Promise<LocalTextStyle[]> => {
	const textStyles = await figma.getLocalTextStylesAsync();

	return textStyles.map((s) => ({
		fontFamily: s.fontName.family,
		fontWeight: s.fontName.style,
		fontSize: s.fontSize,
		amountOfConsumers: s.consumers.length,
	}));
};

// TODO: add gradient and other paints
export const getLocalPaintStyles = async (): Promise<NodeCSS> => {
	const paintStyles = await figma.getLocalPaintStylesAsync();

	const resultObject: NodeCSS = {};

	for (const paintStyle of paintStyles) {
		const value = await getPaintStyleValue(paintStyle.paints[0]);

		if (!value) continue;

		resultObject[paintStyleNameToCSSVar(paintStyle.name)] = value;
	}

	return resultObject;
};
