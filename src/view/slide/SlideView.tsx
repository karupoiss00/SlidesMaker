import React, {ReactNode} from 'react'
import {Slide} from "../../model/slide/Slide";
import {createTextBox, setTextBoxText, switchTextBoxBold} from "../../model/slide/slide_objects/textbox/TextBox";
import {TextBoxView} from "../objects_view/TextBoxView";
import {createRect} from "../../model/types/Rect";
import {createParagraph, setParagraphAlignment} from "../../model/types/Paragraph";
import {createFont, setFontFontColor, switchFontBold} from "../../model/types/Font";
import {Alignment} from "../../model/types/Alignment";
import {Colors} from "../../model/types/Colors";

interface SlideViewProps {
    className: string;
    slide: Slide | null;
}

function SlideView(props: SlideViewProps) {
    let background: string;
    const currentSlide: Slide | null = props.slide;
    const slideObjects: Array<ReactNode> = [];
    if (currentSlide)
    {
        if (typeof(currentSlide.background) !== "string")
        {
            background = `center / cover no-repeat url(${currentSlide.background.src})`;
        }
        else
        {
            background = currentSlide.background;
        }
    }
    else {
        background = "#ffffff";
    }

    return (
        <div className={props.className} style={{background: background}}>
            <TextBoxView textBox={switchTextBoxBold(setTextBoxText(createTextBox(
                createRect(400, 500, 200, 150),
                setParagraphAlignment(createParagraph(), Alignment.CENTER),
                setFontFontColor(createFont('Courier', 30), Colors.GREEN)
            ), 'Test Text Box'))} />
        </div>
    )

}

export {
    SlideView,
}
