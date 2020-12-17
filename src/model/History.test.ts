import {addToHistory, undo, redo} from "./History";
import {setCurrentSlideBackground, SlidesMaker} from "./SlidesMaker";
import {Colors} from "./types/Colors";

test(`History: undo, redo, addToHistory`,() => {
    const State: SlidesMaker = {
        slideList:  [{
            objects: {},
            background: Colors.WHITE,
        }, {
            objects: {},
            background: Colors.BLUE,
        }, {
            objects: {},
            background: Colors.BLANCHEDALMOND,
        }],

        selectedObjectId: null,
        currentSlide: 2,
    };
    addToHistory(State);
    const NewState = setCurrentSlideBackground(State, Colors.RED);
    expect(State).toStrictEqual(undo(NewState));
    expect(NewState).toStrictEqual(redo());
});
