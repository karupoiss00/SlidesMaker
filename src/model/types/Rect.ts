export type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
}

function createRect(x: number, y: number, width: number, height: number): Rect {
    return {
        x: x,
        y: y,
        width: width,
        height: height,
    }
}

function setRectX(rect: Rect, x: number): Rect {
    return {
        ...rect,
        x: x,
    }
}

function setRectY(rect: Rect, y: number): Rect {
    return {
        ...rect,
        y: y,
    }
}

function setRectWidth(rect: Rect, width: number): Rect {
    return {
        ...rect,
        width: width,
    }
}

function setRectHeight(rect: Rect, height: number): Rect {
    return {
        ...rect,
        height: height,
    }
}

export {createRect, setRectX, setRectY, setRectWidth, setRectHeight};