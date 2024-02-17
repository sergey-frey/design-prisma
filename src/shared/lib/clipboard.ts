export const copyToClipboard = (text: string) => {
	return new Promise<boolean>((resolve, reject) => {
		try {
			const area = document.createElement("textarea");
      area.classList.add('copy-area')
			document.body.appendChild(area);
			area.value = text;
			area.focus();
			area.select();
			const result = document.execCommand("copy");
			document.body.removeChild(area);
			if (!result) {
				throw new Error();
			}
			resolve(true);
		} catch (err) {
			reject(err);
		}
	});
};
