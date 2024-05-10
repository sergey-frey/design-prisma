import type { Mutable } from "@/shared/types/index";
import type { NodeBlock, NodeCSS } from "../types";

export const formatStyles = (styles: NodeCSS | NodeBlock): string => {
	let res = "";

	for (const rule of Object.keys(styles) as Array<keyof typeof styles>) {
		const value = styles[rule];

		if (!value) continue;

		res += `${rule}: ${value};\n`;
	}

	return res;
};

export const paintStyleNameToCSSVar = (styleName: string): string => {
	if (styleName === "") {
		return "--<empty>";
	}

	const transformedStyleName = styleName
		.split("/")
		.map((p) => p.toLowerCase())
		.join("-")
		.split(" ")
		.join("-");

	return `--${transformedStyleName}`;
};

export const figmaRGBToHEX = (color: Mutable<RGB>, opacity: number): string => {
	let res = "#";
	const opacityPart = Math.round(255 * Math.min(Math.max(opacity, 0), 1))
		.toString(16)
		.padStart(2, "0");

	for (const key of Object.keys(color) as Array<keyof RGB>) {
		const part = Math.round(color[key] * 255)
			.toString(16)
			.padStart(2, "0");
		res += part;
	}

	if (opacity !== 1) {
		res += opacityPart;
	}

	return res;
};

export const pxToRem = (px: number, k: number): number => {
	return Number((px / k).toFixed(3));
};
