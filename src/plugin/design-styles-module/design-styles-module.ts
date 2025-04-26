import type { LocalTextStyle, NodeCSS } from "@/shared/types";
import { paintStyleNameToCSSVar } from "@/shared/utils";
import { getPaintStyleValue } from "../code-module";

export const getLocalTextStyles = async (): Promise<LocalTextStyle[]> => {
	const figmaTextStyles = await figma.getLocalTextStylesAsync();
	const textStyles = [];

	for (const figmaTextStyle of figmaTextStyles) {
		const figmaTextStyleConsumers =
			await figmaTextStyle.getStyleConsumersAsync();
		const amountOfConsumers = figmaTextStyleConsumers.length;

		textStyles.push({
			fontFamily: figmaTextStyle.fontName.family,
			fontWeight: figmaTextStyle.fontName.style,
			fontSize: figmaTextStyle.fontSize,
			amountOfConsumers,
		});
	}

	return textStyles;
};

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
