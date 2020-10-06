export type Font = {
	fontName: string;
	fontSize: number;
	isBold: boolean;
	isItalic: boolean;
	isUnderlined: boolean;
};

function createFont(): Font {
	return {
		fontName: '',
		fontSize: 0,
		isBold: false,
		isItalic: false,
		isUnderlined: false,
	};
}

export { createFont };
