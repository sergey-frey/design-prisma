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
			todo: {
				todoTitle: string;
				todoList: string[];
			};
			feedback: {
				aboutEmail: string;
				email: string;
				aboutTg: string;
				tg: string;
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
				todo: {
					todoTitle: "Ближайшие цели по развитию",
					todoList: [
						"Выделить в отдельный блок flex-стили элемента",
						"Добавить в переменные макета шрифты",
						"Одна классная штука :)",
					],
				},
				feedback: {
					aboutEmail:
						"Вопросы и предложения по развитию плагина принимаются на",
					email: "3str.webdev@gmail.com",
					aboutTg: "Так же, вы можете написать мне в Telegram",
					tg: "@serg_3str",
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
				todo: {
					todoTitle: "Development goals",
					todoList: [
						"Extract flex-styles to separate block",
						"Add fonts to design variables",
						"Something cool :)",
					],
				},
				feedback: {
					aboutEmail:
						"You can write me your questions and suggestions for development by",
					email: "3str.webdev@gmail.com",
					aboutTg: "Also you can contact me in Telegram",
					tg: "@serg_3str",
				},
			},
		},
	},
};
