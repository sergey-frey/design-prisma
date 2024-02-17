import { msgToPluginObserver, postMessageToUI } from "@/shared/lib";
import {
	type GetSettingsResponse,
	type MessageToPlugin,
	type Settings,
	Unit,
} from "@/shared/types";

type PluginData = {
	settings: Settings;
};

type PluginDataValue = PluginData[keyof PluginData];

export class PluginDataModule {
	initData: PluginData = {
		settings: {
			hideDesignSystem: false,
			lang: "ru",
			units: Unit.px,
			nav: "DESIGN",
		},
	};

	public init() {
		this.initSettings();

		msgToPluginObserver.subscribe(this.handleGetSettingsQuery.bind(this));
		msgToPluginObserver.subscribe(this.handleSetSettingsQuery.bind(this));
		msgToPluginObserver.subscribe(this.handleResetPluginDataMessage.bind(this));
	}

	private initSettings() {
		const settings = this.getData("settings");

		if (settings === undefined) {
			this.setData("settings", this.initData.settings);
		}
	}

	private setData(key: keyof PluginData, value: PluginDataValue) {
		figma.currentPage.setPluginData(key, JSON.stringify(value));
	}

	private resetData() {
		const keys: (keyof PluginData)[] = ["settings"];
		for (const key of keys) {
			figma.currentPage.setPluginData(key, "");
		}
	}

	private getData(key: keyof PluginData): PluginDataValue | undefined {
		try {
			return JSON.parse(
				figma.currentPage.getPluginData(key),
			) as PluginDataValue;
		} catch (err) {
			console.log(err);
			return undefined;
		}
	}

	private handleGetSettingsQuery(msg: MessageToPlugin) {
		if (msg.action !== "get-settings-query") return;

		const settings = this.getData("settings");

		if (settings !== undefined) {
			postMessageToUI<GetSettingsResponse>({
				action: "get-settings-response",
				settings,
			});
		}
	}

	private handleSetSettingsQuery(msg: MessageToPlugin) {
		if (msg.action !== "set-settings-query") return;
		this.setData("settings", msg.settings);

		postMessageToUI<GetSettingsResponse>({
			action: "get-settings-response",
			settings: msg.settings,
		});
	}

	private handleResetPluginDataMessage(msg: MessageToPlugin) {
		if (msg.action !== "reset-plugin-data-message") return;
		this.resetData();
	}
}
