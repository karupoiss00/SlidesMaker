import React, {ReactNode} from 'react'
import {Slide} from "../../model/slide/Slide";
import {TextBoxView} from "../objects_view/TextBoxView";
import {Id} from "../../model/slide/slide_objects/id/Id";
import {ShapeView} from "../objects_view/ShapeView";
import {PictureView} from "../objects_view/PictureView";

interface SlideViewProps {
    className: string;
    slide: Slide | null;
    selectedObject: Id | null;
    scale?: number;
    update: (newSelectedId: Id | null) => any;
}

function getSlideObjects(slide: Slide, selectedObject: Id | null, callback:  (newSelectedId: Id | null) => void, scale: number): Array<ReactNode> {
    const slideObjects: Array<ReactNode> = [];

    slide.objects.forEach((pair) => {
        if ("text" in pair.object) {
            let isSelectedObject = false;
            if (selectedObject)
            {
                if (pair.id === selectedObject)
                {
                    isSelectedObject = true;
                }
            }
            slideObjects.push(
                <TextBoxView textBox={pair.object}
                             isSelected={isSelectedObject}
                             key={pair.id}
                             objectId={pair.id}
                             onClick={callback}
                             scale={scale}
                />
            );
        }
        else if ("shapeType" in pair.object) {
            let isSelectedObject = false;
            if (selectedObject)
            {
                if (pair.id === selectedObject)
                {
                    isSelectedObject = true;
                }
            }
            slideObjects.push(
                <ShapeView shape={pair.object}
                           isSelected={isSelectedObject}
                           key={pair.id}
                           objectId={pair.id}
                           onClick={callback}
                           scale={scale}
                />
            );
        }
        else if ("src" in pair.object) {
            let isSelectedObject = false;
            if (selectedObject)
            {
                if (pair.id === selectedObject)
                {
                    isSelectedObject = true;
                }
            }
            slideObjects.push(
                <PictureView picture={pair.object}
                           isSelected={isSelectedObject}
                           key={pair.id}
                           objectId={pair.id}
                           onClick={callback}
                           scale={scale}
                />
            );
        }
    });

    return slideObjects;
}

function getSlideBackground(slide: Slide | null): string {
    let background= "#ffffff";

    if (slide)
    {
        if (typeof(slide.background) !== "string")
        {
            background = `center / cover no-repeat url(${slide.background.src})`;
        }
        else
        {
            background = slide.background;
        }

    }

    return background;
}


function SlideView(props: SlideViewProps) {
    const currentSlide: Slide | null = props.slide;
    const scale: number = props.scale ? props.scale : 1;

    return (
        <div className={props.className}
             style={
                 {
                     background: getSlideBackground(currentSlide)
                 }
             }
             onClick={
                 () => props.update(null)
             }
        >
            {currentSlide && getSlideObjects(currentSlide, props.selectedObject, props.update, scale)}
        </div>
    )

}



export {
    SlideView,
}
