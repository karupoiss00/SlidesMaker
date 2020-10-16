import {createStyle, Style} from "./Style";
import {Colors} from "./Colors";

test(`Style: createStyle`,() => {
    const style: Style = {
        backgroundColor: Colors.WHITE,
        strokeColor: Colors.BLACK,
        strokeWidth: 2,
    };
    expect(style).toStrictEqual(createStyle());
});