export type Font = {
    fontName: string;
    fontSize: number;
    isBold: boolean;
    isItalic: boolean;
    isUnderlined: boolean;
};

function createFont(fontName: string, fontSize: number): Font {
    return {
        fontName: fontName,
        fontSize: fontSize,
        isBold: false,
        isItalic: false,
        isUnderlined: false,
    };
}

function setFontName(font: Font, fontName: string): Font {
    return {
        ...font,
        fontName: fontName
    }
}

function setFontSize(font: Font, fontSize: number): Font {
    return {
        ...font,
        fontSize: fontSize
    }
}

function setBold(font: Font, state: boolean): Font {
    return {
        ...font,
        isBold: state
    }
}

function setItalic(font: Font, state: boolean): Font {
    return {
        ...font,
        isItalic: state
    }
}

function setUnderline(font: Font, state: boolean): Font {
    return {
        ...font,
        isUnderlined: state
    }
}

export { createFont, setFontName, setFontSize, setBold, setItalic, setUnderline };