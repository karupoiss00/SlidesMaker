import {createStyle} from "./Style";
import {Colors} from "../Colors";

describe("Style.ts", () => {
    test('Style.ts: createStyle', () => {
        expect({
            backgroundColor: Colors.WHITE,
            strokeColor: Colors.BLACK,
            strokeWidth: 2,
        }).toStrictEqual(createStyle());
    });
})