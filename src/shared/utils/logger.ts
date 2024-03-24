class Logger {
	private logFn: (...args: unknown[]) => void;
	private isDev = process.env.NODE_ENV === "development";

	constructor(logFn: (...args: unknown[]) => void) {
		this.logFn = logFn;
	}

	public log(...args: unknown[]): void {
		if (!this.isDev) {
			return;
		}

		this.logFn(...args);
	}
}

export const logger = new Logger(console.log);
