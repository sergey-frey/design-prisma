import {
	handleGetDesignLocalPaintStylesQuery,
	handleGetDesignLocalTextStylesQuery,
} from "@/plugin/design-styles-module";
import { msgToPluginObserver, postMessageToUI } from "@/shared/lib";
import type {
	MessageToPlugin,
	SelectedNodeChangeMessage,
} from "@/shared/types";
import {
	getNodeBlock,
	getNodeCSS,
	getNodeSVG,
	getNodeText,
} from "../code-module";
import type { PluginDataModule } from "../plugin-data-module";

export class StylerModule {
	private selectedNode: SceneNode;
	private pluginDataModule: PluginDataModule;

	constructor(pluginDataModule: PluginDataModule) {
		this.selectedNode = figma.currentPage.selection[0];
		this.pluginDataModule = pluginDataModule;

		this.init();
		this.pluginDataModule.init();
	}

	public init() {
		figma.showUI(__html__, {
			width: 400,
			height: 700,
			position: {
				x: 100000,
				y: -100000,
			},
		});

		this.initMessageToPluginObserver();
		this.initSelectedNodeChangeObserver();
	}

	private initMessageToPluginObserver() {
		msgToPluginObserver.subscribe(
			handleGetDesignLocalTextStylesQuery,
			"get-design-local-text-styles-query",
		);
		msgToPluginObserver.subscribe(
			handleGetDesignLocalPaintStylesQuery,
			"get-design-local-paint-styles-query",
		);

		figma.ui.onmessage = (msg: MessageToPlugin) => {
			msgToPluginObserver.broadcast(msg);
		};
	}

	private initSelectedNodeChangeObserver() {
		figma.on("selectionchange", async () => {
			// TODO: add setter
			this.selectedNode = figma.currentPage.selection[0];

			this.handleSelectedNodeChange();
		});
	}

	private async handleSelectedNodeChange() {
		postMessageToUI<SelectedNodeChangeMessage>({
			action: "selected-node-change",
			nodeId: this.selectedNode.id,
			nodeName: this.selectedNode.name,
			nodeCSS: await getNodeCSS(this.selectedNode),
			nodeBlock: await getNodeBlock(this.selectedNode),
			nodeSVG: await getNodeSVG(this.selectedNode),
			nodeText: getNodeText(this.selectedNode),
		});
	}
}
