import {Colors} from './Colors';

export type Style = {
    backgroundColor: Colors;
    strokeColor: Colors;
    strokeWidth: number;
}

function createStyle(backgroundColor: Colors, strokeColor: Colors, strokeWidth: number): Style {
    return {
        backgroundColor: backgroundColor,
        strokeColor: strokeColor,
        strokeWidth: strokeWidth,
    }
}

function setStyleBackgroundColor(style: Style, color: Colors): Style {
    return {
        ...style,
        backgroundColor: color,
    }
}

function setStyleStrokeColor(style: Style, color: Colors): Style {
    return {
        ...style,
        strokeColor: color,
    }
}

function setStyleStrokeWidth(style: Style, width: number): Style {
    return {
        ...style,
        strokeWidth: width,
    }
}

export {createStyle, setStyleBackgroundColor, setStyleStrokeColor, setStyleStrokeWidth};