import {Colors} from "./Colors";

export type Font = {
    fontName: string;
    fontSize: number;
    fontColor: Colors;
    isBold: boolean;
    isItalic: boolean;
    isUnderlined: boolean;
}

function createFont(fontName: string, fontSize: number): Font {
    return {
        fontName: fontName,
        fontSize: fontSize,
        fontColor: Colors.BLACK,
        isBold: false,
        isItalic: false,
        isUnderlined: false,
    }
}

function setFontFontName(font: Font, fontName: string): Font {
    return {
        ...font,
        fontName: fontName,
    }
}

function setFontFontSize(font: Font, fontSize: number): Font {
    return {
        ...font,
        fontSize: fontSize,
    }
}

function setFontFontColor(font: Font, fontColor: Colors): Font {
    return {
        ...font,
        fontColor: fontColor,
    }
}

function switchFontBold(font: Font): Font {
    return {
        ...font,
        isBold: !font.isBold,
    }
}

function switchFontItalic(font: Font): Font {
    return {
        ...font,
        isItalic: !font.isItalic,
    }
}

function switchFontUnderline(font: Font): Font {
    return {
        ...font,
        isUnderlined: !font.isUnderlined,
    }
}

export {
    createFont,
    setFontFontName,
    setFontFontSize,
    switchFontBold,
    switchFontItalic,
    switchFontUnderline,
    setFontFontColor
};