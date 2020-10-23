export type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
};

function createRect(x: number, y: number, width: number, height: number): Rect {
    return {
        x: x,
        y: y,
        width: width,
        height: height,
    };
}

function setX(rect: Rect, x: number): Rect {
    return {
        ...rect,
        x: x,
    }
}

function setY(rect: Rect, y: number): Rect {
    return {
        ...rect,
        y: y,
    }
}

function setWidth(rect: Rect, width: number): Rect {
    return {
        ...rect,
        width: width,
    }
}

function setHeight(rect: Rect, height: number): Rect {
    return {
        ...rect,
        height: height,
    }
}

export { createRect, setX, setY, setWidth, setHeight };