import type { Lang, NavPage } from "../types";

type PageWrapperContent = Record<NavPage, { title: string }>;

type LangContent = {
	nav: Record<NavPage, string>;
	pages: PageWrapperContent & {
		STYLES: {
			elementPrefix: string;
			nodeBlockTitle: string;
			nodeCSSTitle: string;
			nodeTextTitle: string;
		};
		DESIGN: {
			colorsTitle: string;
			fontTableHead: {
				fontFamily: string;
				fontWeight: string;
				fontSize: string;
			};
		};
		SETTINGS: {
			switchLanguage: string;
			switchUnits: string;
			toggleSettings: {
				hideDesignSystem: string;
			};
		};
	};
};

export const content: Record<Lang, LangContent> = {
	ru: {
		nav: {
			DESIGN: "Макет",
			STYLES: "Стили",
			SETTINGS: "Настройки",
		},
		pages: {
			DESIGN: {
				title: "Общая информация о макете 📖",
				colorsTitle: "Цвета",
				fontTableHead: {
					fontFamily: "Семейство",
					fontWeight: "Начертание",
					fontSize: "Размер",
				},
			},
			STYLES: {
				title: "Стили выбранного элемента 🔍",
				elementPrefix: "Элемент",
				nodeBlockTitle: "Блочная модель",
				nodeCSSTitle: "Стили",
				nodeTextTitle: "Текст",
			},
			SETTINGS: {
				title: "Дополнительные настройки ✅",
				switchLanguage: "Сменить язык",
				switchUnits: "Сменить единицы измерения",
				toggleSettings: {
					hideDesignSystem: "Скрыть :root селектор",
				},
			},
		},
	},
	en: {
		nav: {
			DESIGN: "Design",
			STYLES: "Styles",
			SETTINGS: "Settings",
		},
		pages: {
			DESIGN: {
				title: "Design system 📖",
				colorsTitle: "Colors",
				fontTableHead: {
					fontFamily: "Family",
					fontWeight: "Weight",
					fontSize: "Size",
				},
			},
			STYLES: {
				title: "Selected element stiles 🔍",
				elementPrefix: "Element",
				nodeBlockTitle: "Block model",
				nodeCSSTitle: "Styles",
				nodeTextTitle: "Text content",
			},
			SETTINGS: {
				title: "Other settings ✅",
				switchLanguage: "Switch language",
				switchUnits: "Switch units",
				toggleSettings: {
					hideDesignSystem: "Hide :root selector",
				},
			},
		},
	},
};
