import {createRect, Rect} from "./Rect";

test(`Rect: createRect`,() => {
    const rect: Rect = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };
    expect(rect).toStrictEqual(createRect());
});