export type NodeCSS = {
	[key: string]: string;
};

export type NodeBlock = {
	width: string;
	height: string;
	padding?: string;
	"border-radius"?: string;
};

export enum Unit {
	px = "px",
	rem = "rem",
}

export type LocalTextStyle = {
	fontFamily: string;
	fontWeight: string;
	fontSize: number;
	amountOfConsumers: number;
};
