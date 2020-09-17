class Rect {
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;

    constructor() {
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
    }

    getX(): number {
        return this._x;
    }

    getY(): number {
        return this._y;
    }

    getWidth(): number {
        return this._width;
    }

    getHeight(): number {
        return this._height;
    }

    setX(x: number) {
        this._x = x;
    }

    setY(y: number) {
        this._y = y;
    }

    setWidth(width: number) {
        this._width = width;
    }

    setHeight(height: number) {
        this._height = height;
    }

    clone(): Rect {
        const newRect = new Rect();

        newRect.setX(this._x);
        newRect.setY(this._y);
        newRect.setWidth(this._width);
        newRect.setHeight(this._height);

        return newRect;
    }

}

export {Rect}