export const toTitle = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const sortByField = <T extends object>(field: keyof T) => {
	return (a: T, b: T) => (a[field] >= b[field] ? 1 : -1);
};
