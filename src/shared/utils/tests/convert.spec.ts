import type { NodeBlock, NodeCSS } from "@/shared/types";
import { expect, it } from "vitest";
import {
	figmaRGBToHEX,
	formatStyles,
	paintStyleNameToCSSVar,
} from "../convert";

it("UTIL: format styles", () => {
	const styles: NodeCSS | NodeBlock = {
		"border-radius": "10px",
		padding: "10px",
		"background-color": "red",
		height: "100px",
	};

	const emptyStyles: NodeCSS | NodeBlock = {};

	expect(formatStyles(styles)).toBe(
		"border-radius: 10px;\npadding: 10px;\nbackground-color: red;\nheight: 100px;\n",
	);
	expect(formatStyles(emptyStyles)).toBe("");
});

it("UTIL: convert paint style name to css variable", () => {
	const styleName = "some Property name/800";
	const emptyStyleName = "";

	expect(paintStyleNameToCSSVar(styleName)).toBe("--some-property-name-800");
	expect(paintStyleNameToCSSVar(emptyStyleName)).toBe("--<empty>");
});

it("UTIL: convert Figma RGB to HEX", () => {
	const colorMedian = {
		r: 0.5,
		g: 0.5,
		b: 0.5,
	};
	const opacityMedian = 0.5;

	const redColor = {
		r: 1,
		g: 0.1,
		b: 0.1,
	};
	const opacityRed = 0.9;

	expect(figmaRGBToHEX(colorMedian, opacityMedian)).toBe("#80808080");
	expect(figmaRGBToHEX(redColor, opacityRed)).toBe("#ff1a1ae6");
});
