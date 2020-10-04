import {Color} from "./Color";

export type Style = {
    backgroundColor: Color,
    strokeColor: Color,
    strokeWidth: number,
}

function createStyle() {
    return {
        backgroundColor: Color.WHITE,
        strokeColor: Color.BLACK,
        strokeWidth: 2,
    }
}

export {createStyle}
