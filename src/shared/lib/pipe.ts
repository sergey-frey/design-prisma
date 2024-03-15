export const pipe = <T>(value: T, modifications: ((v: T) => T)[]): T => {
	let result: T = value;

	for (const m of modifications) {
		result = m(result);
	}

	return result;
};
