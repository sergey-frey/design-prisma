import { logger } from "@/shared/utils";
import { noticeStore } from "./notice-store";

type NotificationOptions = {
	delay: number;
};

export const notification = (
	message: string,
	{ delay }: NotificationOptions,
) => {
	let noticeTimeout = 0;

	noticeStore.update((s) => {
		return {
			...s,
			isShow: true,
			message,
		};
	});

	noticeTimeout = setTimeout(() => {
		noticeStore.update((s) => {
			return {
				...s,
				isShow: false,
			};
		});

		logger.log("Hide notice");

		clearTimeout(noticeTimeout);
	}, delay);
};
