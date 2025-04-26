import { figmaRGBToHEX } from "@/shared/utils";
import type { NodeBlock, NodeCSS } from "@/shared/types";
import { figmaGradientToCSS } from "@/shared/utils/convert";

export const getNodeCSS = async (node: SceneNode): Promise<NodeCSS> => {
	const css = await node.getCSSAsync();

	// biome-ignore lint/performance/noDelete: <explanation>
	delete css.width;
	// biome-ignore lint/performance/noDelete: <explanation>
	delete css.height;

	return css as NodeCSS;
};

export const getNodeBlock = async (node: SceneNode): Promise<NodeBlock> => {
	const nodeCSS = await getNodeCSS(node);
	const nodeBlock = {
		width: `${node.width.toFixed(1)}px`,
		height: `${node.height.toFixed(1)}px`,
		padding: nodeCSS.padding,
	};

	return nodeBlock;
};

export const getNodeSVG = async (node: SceneNode): Promise<string> => {
	if (node.type === "VECTOR") {
		return node.exportAsync({ format: "SVG_STRING" });
	}

	return "";
};

export const getNodeText = (node: SceneNode): string => {
	if (node.type === "TEXT") {
		return node.characters;
	}

	return "";
};

export const getPaintStyleValue = async (
	paintStyle: Paint
): Promise<string> => {
	if (paintStyle.type === "SOLID") {
		const opacity = paintStyle.opacity !== undefined ? paintStyle.opacity : 1;
		return figmaRGBToHEX(paintStyle.color, opacity);
	}

	const allPossibleGradientTypes: (typeof paintStyle.type)[] = [
		"GRADIENT_LINEAR",
		"GRADIENT_RADIAL",
		"GRADIENT_ANGULAR",
		"GRADIENT_DIAMOND",
	];

	if (allPossibleGradientTypes.includes(paintStyle.type)) {
		return await figmaGradientToCSS(paintStyle as GradientPaint);
	}

	return "";
};
