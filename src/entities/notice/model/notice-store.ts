import { writable } from "svelte/store";

type NoticeStore = {
	isShow: boolean;
	message: string;
};

export const noticeStore = writable<NoticeStore>({
	isShow: false,
	message: "",
});
