import React, {ReactNode} from 'react'
import {Slide} from "../../model/slide/Slide";
import {TextBoxView} from "../objects_view/TextBoxView";

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

        currentSlide.objects.forEach((pair) => {
            if ("text" in pair.object) {
                slideObjects.push(
                    <TextBoxView textBox={pair.object} key={pair.id}/>
                );
            }
        });
    }
    else {
        background = "#ffffff";
    }

    return (
        <div className={props.className} style={{background: background}}>
            {slideObjects}
        </div>
    )

}

export {
    SlideView,
}
