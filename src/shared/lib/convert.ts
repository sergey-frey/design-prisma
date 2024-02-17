import { type NodeBlock, type NodeCSS, Unit } from "../types";
import type { Mutable } from "@/shared/types/index";

export const normalizeSeparatedStyle = (
	style: string | NodeCSS,
): number[] | undefined => {
	if (typeof style !== "string") return undefined;
	try {
		return style.split(" ").map((v) => Number(v.replace("px", "")));
	} catch (err) {
		console.log("normalizeSeparatedStyle ERROR:", err);
		return undefined;
	}
};

export const formatStyles = (
	styles: NodeCSS | NodeBlock,
	unit: Unit = Unit.px,
): string => {
	let res = "";

	for (const rule of Object.keys(styles) as Array<keyof typeof styles>) {
		const value = styles[rule];

		if (!value) continue;

		res += `${rule}: ${convertUnits(value, unit)};\n`;
	}

	return res;
};

export const paintStyleNameToCSSVar = (styleName: string): string => {
	return `--${styleName
		.split("/")
		.map((p) => p.toLowerCase())
		.join("-")
		.split(" ")
		.join("-")}`;
};

export const figmaRGBToHEX = (color: Mutable<RGB>, opacity: number): string => {
	let res = "#";

	for (const key of Object.keys(color) as Array<keyof RGB>) {
		const part = Math.round(color[key] * 255)
			.toString(16)
			.padStart(2, "0");
		res += part;
	}

	return res;
};

export const pxToRem = (px: number, k: number): number => {
	return Number((px / k).toFixed(3));
};

export const convertUnits = (value: string, unit: Unit): string => {
	// FIXME: Переделать по-человечески :)
	if (unit === Unit.rem) {
		return value.replace(/([^\s]+)px/g, (match) => {
			return pxToRem(Number(match.slice(0, match.length - 2)), 16) + unit;
		});
	}

	return value;
};
