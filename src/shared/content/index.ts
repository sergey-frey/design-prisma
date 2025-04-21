import type { Lang, NavPage } from "../types";

type PageWrapperContent = Record<NavPage, { title: string }>;

type LangContent = {
	nav: Record<NavPage, string>;
	contextMenu: {
		codeRowOptions: {
			copyRow: string;
			copyValue: string;
		};
	};
	codeField: {
		rmb: string;
	};
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
			switchPreprocessor: string;
			toggleSettings: {
				hideDesignSystem: string;
				disableDesignVariables: string;
				disableCodeComments: string;
			};
			resetSize: {
				title: string;
				buttonText: string;
			};
			todo: {
				todoTitle: string;
				todoList: string[];
			};
			feedback: {
				aboutEmail: string;
				aboutTg: string;
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
		contextMenu: {
			codeRowOptions: {
				copyRow: "Копировать строку",
				copyValue: "Копировать значение",
			},
		},
		codeField: {
			rmb: "доступно контектное меню (пкм)",
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
				switchPreprocessor: "Сменить препроцессор",
				toggleSettings: {
					hideDesignSystem: "Скрыть :root селектор",
					disableDesignVariables: "Скрыть var(--some-var, value)",
					disableCodeComments: "Отключить комментарии в стилях",
				},
				resetSize: {
					title: "Сбросить размер плагина",
					buttonText: "Сбросить",
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
					aboutTg:
						"Так же, новости о плагине и прочих моих разработках в группе Telegram",
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
		contextMenu: {
			codeRowOptions: {
				copyRow: "Copy row",
				copyValue: "Copy rule value",
			},
		},
		codeField: {
			rmb: "rmb",
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
				title: "Selected element styles 🔍",
				elementPrefix: "Element",
				nodeBlockTitle: "Block model",
				nodeCSSTitle: "Styles",
				nodeTextTitle: "Text content",
			},
			SETTINGS: {
				title: "Other settings ✅",
				switchLanguage: "Switch language",
				switchUnits: "Switch units",
				switchPreprocessor: "Switch preprocessor",
				toggleSettings: {
					hideDesignSystem: "Hide :root selector",
					disableDesignVariables: "Hide var(--some-var, value)",
					disableCodeComments: "Hide style comments",
				},
				resetSize: {
					title: "Reset plugin size",
					buttonText: "Reset",
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
					aboutTg: "Also you can contact me in Telegram",
				},
			},
		},
	},
};
