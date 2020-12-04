import React, {MutableRefObject, useState} from "react";
import {Rect} from "../../model/types/Rect";
import {Coords, useDragAndDrop} from "./useDragAndDrop";
import  {CornerType} from "../objects_view/CornerView";

interface ViewParams {
    cornerRef: MutableRefObject<HTMLDivElement | null>;
    objectRef: MutableRefObject<HTMLDivElement | null>;
    isSelected: boolean;
    cornerType: CornerType;
}

export function useResize(view: ViewParams, rect: Rect, onEnd: Function) {
    const [cornerCoords, setCornerCoords] = useState({x: 0, y: 0});
    const [newRect, setNewRect] = useState({...rect});

    const updateCornerStyle = (ref: MutableRefObject<HTMLDivElement | null>, cornerType: CornerType) => {
        if (ref.current)
            if (cornerType === 'LeftTop')
            {
                ref.current.style.left = "-8px";
                ref.current.style.top = "-8px";
            }
            else if (cornerType === 'LeftBottom')
            {
                ref.current.style.left = "-8px";
                ref.current.style.bottom = "-8px";
            }
            else if (cornerType === 'RightTop')
            {
                ref.current.style.right = "-8px";
                ref.current.style.top = "-8px";
            }
            else if (cornerType === 'RightBottom')
            {
                ref.current.style.right = "-8px";
                ref.current.style.bottom = "-8px";
            }
    }

    const calcFromLeftTopCorner = (oldRect: Rect, delta: Coords): Rect => {
        return  {
            x: oldRect.x + delta.x,
            y: oldRect.y + delta.y,
            width: oldRect.width - delta.x,
            height: oldRect.height - delta.y,
        }
    }

    const calcFromLeftBottomCorner = (oldRect: Rect, delta: Coords): Rect => {
        return  {
            x: oldRect.x + delta.x,
            y: oldRect.y,
            width: oldRect.width - delta.x,
            height: oldRect.height + delta.y,
        }
    }

    const calcFromRightTopCorner = (oldRect: Rect, delta: Coords): Rect => {
        return  {
            x: oldRect.x,
            y: oldRect.y + delta.y,
            width: oldRect.width + delta.x,
            height: oldRect.height - delta.y,
        }
    }

    const calcFromRightBottomCorner = (oldRect: Rect, delta: Coords): Rect => {
        return  {
            ...oldRect,
            width: oldRect.width + delta.x,
            height: oldRect.height + delta.y,
        }
    }

    const calculateNewRect = (cornerType: CornerType, oldRect: Rect, delta: Coords): Rect => {
        if (cornerType === 'LeftTop')
        {
            return calcFromLeftTopCorner(oldRect, delta);
        }
        else if (cornerType === 'LeftBottom')
        {
            return calcFromLeftBottomCorner(oldRect, delta);
        }
        else if (cornerType === 'RightTop')
        {
            return calcFromRightTopCorner(oldRect, delta);
        }
        else if (cornerType === 'RightBottom')
        {
            return calcFromRightBottomCorner(oldRect, delta);
        }
        else
        {
            return oldRect;
        }
    }

    useDragAndDrop({
        coords: cornerCoords,
        setNewCoords: setCornerCoords,
    }, {
        ref: view.cornerRef,
        isSelected: view.isSelected,
        needUpdate: false,
    }, (newX: number, newY: number) => {
        onEnd(calculateNewRect(view.cornerType, rect, {x: newX, y: newY}));
        return;
    })

    React.useLayoutEffect(() => {
        if (view.objectRef.current && view.cornerRef.current) {
            updateCornerStyle(view.cornerRef, view.cornerType);
            view.objectRef.current.style.left = `${newRect.x}px`;
            view.objectRef.current.style.top = `${newRect.y}px`;
            view.objectRef.current.style.width = `${newRect.width}px`;
            view.objectRef.current.style.height = `${newRect.height}px`;
        }
    }, [newRect, setNewRect]);

    React.useEffect(() => {
        setNewRect(calculateNewRect(view.cornerType, rect, cornerCoords));
    }, [cornerCoords, setCornerCoords]);
}