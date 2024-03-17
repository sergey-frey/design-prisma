export type PipeModification<T> = (v: T) => T;

export const pipe = <T>(value: T, modifications: PipeModification<T>[]): T => {
	let result: T = value;

	for (const m of modifications) {
		result = m(result);
	}

	return result;
};
