import {createRect} from "./Rect";

describe("Rect.ts", () => {
    test('Rect.ts: createRect', () => {
        expect({
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        }).toStrictEqual(createRect());
    });
})