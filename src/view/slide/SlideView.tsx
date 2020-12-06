import React, {ReactNode, useEffect, useLayoutEffect, useRef, useState} from 'react'
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
    onResize?: (newSize: {
        width: number;
        height: number;
    }) => any;
}

function getSlideObjects(slide: Slide, selectedObject: Id | null, callback:  (newSelectedId: Id | null) => void, scale: number): Array<ReactNode> {
    const slideObjects: Array<ReactNode> = [];

    slide.objects.forEach((pair) => {
        let isSelectedObject = false;
        if (selectedObject)
        {
            if (pair.id === selectedObject)
            {
                isSelectedObject = true;
            }
        }
        if ("text" in pair.object) {
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
        if (typeof(slide.background) === "string")
        {
            background = slide.background;
        }
        else
        {
            background = `center / cover no-repeat url(${slide.background.src})`;
        }

    }

    return background;
}


function SlideView(props: SlideViewProps) {
    const currentSlide: Slide | null = props.slide;
    const scale: number = props.scale ? props.scale : 1;
    const ref = useRef<HTMLDivElement>(null);
    const [slideSize, setSlideSize] = useState({
        width: 0,
        height: 0,
    });
    const [adaptiveScale, setAdaptiveScale] = useState({
        adScale: 1,
    });
    const [firstWidth, setFirstWidth] = useState({
        width: 1,
    })

    useLayoutEffect(() => {
        if (props.onResize)
        {
            props.onResize(slideSize);
        }
    }, [slideSize, props])

    useEffect(() => {
        if (ref && ref.current) {
            setSlideSize({
                width: ref.current.clientWidth,
                height: ref.current.clientHeight,
            });
            setFirstWidth({
                width: ref.current.clientWidth,
            })
        }
    }, [])

    useEffect(() => {
        const onResize = () => {
            if (ref && ref.current && slideSize.width) {
                setAdaptiveScale({
                    adScale: ref.current.clientWidth / firstWidth.width,
                });
                setSlideSize({
                    width: ref.current.clientWidth,
                    height: ref.current.clientHeight,
                });
                window.removeEventListener("resize", onResize);
            }
        }
        if (ref && ref.current && props.onResize)
        {
            window.addEventListener("resize", onResize);
        }
    }, [setSlideSize, slideSize, props, firstWidth]);

    useEffect(() => {
        if (ref && ref.current) {
            setSlideSize({
                width: ref.current.clientWidth,
                height: ref.current.clientHeight,
            });
        }
    }, []);

    return (
        <div className={props.className}
             style={{background: getSlideBackground(currentSlide)}}
             onClick={
                 (e) => {
                     if (!e.defaultPrevented && props.selectedObject)
                        props.update(null);
                 }
             }
             ref={ref}
        >
            {currentSlide && getSlideObjects(currentSlide, props.selectedObject, props.update, scale * adaptiveScale.adScale)}
        </div>
    )

}



export {
    SlideView,
}
