export const withRootSelector = (styleString: string): string => {
	return `:root {
    ${styleString}
  }`;
};
