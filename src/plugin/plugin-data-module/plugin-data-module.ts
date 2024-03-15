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
			size: {
				width: 400,
				height: 700,
			},
			disableDesignVariables: false,
		},
	};

	public init() {
		this.initSettings();

		msgToPluginObserver.subscribe(
			this.handleGetSettingsQuery.bind(this),
			"get-settings-query",
		);
		msgToPluginObserver.subscribe(
			this.handleSetSettingsQuery.bind(this),
			"set-settings-query",
		);
		msgToPluginObserver.subscribe(
			this.handleResetPluginDataMessage.bind(this),
			"reset-plugin-data-message",
		);
	}

	private initSettings() {
		const settings = this.getData("settings");

		if (settings === undefined) {
			this.setData("settings", this.initData.settings);
		} else {
			// Если уже были какие-то настройки, добавим их, а поля, которых нет, заполним по умолчанию
			this.setData("settings", Object.assign(this.initData.settings, settings));
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

	public getSettings() {
		return this.getData("settings");
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

		const size = msg.settings.size;

		figma.ui.resize(size.width, size.height);

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
