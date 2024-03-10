import { figmaRGBToHEX } from "@/shared/lib";
import type { NodeBlock, NodeCSS } from "@/shared/types";

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
		"border-radius": nodeCSS["border-radius"],
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

export const getPaintStyleValue = (paintStyle: Paint): string => {
	if (paintStyle.type === "SOLID") {
		const opacity = paintStyle.opacity !== undefined ? paintStyle.opacity : 1;
		return figmaRGBToHEX(paintStyle.color, opacity);
	}

	return "";
};
