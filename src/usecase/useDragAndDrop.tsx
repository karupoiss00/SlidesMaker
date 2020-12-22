import React, {MutableRefObject} from "react";

export interface Coords {
    x: number;
    y: number;
}
interface PositionHook {
    coords: Coords;
    setNewCoords: Function;
}
interface ViewParams {
    ref: MutableRefObject<HTMLDivElement | null>;
    isSelected: boolean;
    needUpdate: boolean;
}
export function useDragAndDrop(position: PositionHook, objectView: ViewParams, onEnd: Function) {
    let startDragX = 0;
    let startDragY = 0;

    React.useLayoutEffect(() => {
        if (objectView?.ref?.current && objectView.needUpdate) {
            objectView.ref.current.style.left = `${position.coords.x}px`
            objectView.ref.current.style.top = `${position.coords.y}px`
        }
    }, [objectView, position.coords, position.setNewCoords]);

    React.useEffect(() => {
        const onDragStart = (e: MouseEvent) => {
            if (!e.defaultPrevented && objectView.isSelected) {
                e.preventDefault();
                startDragX = e.clientX;
                startDragY = e.clientY;
                window.addEventListener('mouseup', onDragEnd, {once: true});
                window.addEventListener('mousemove', onDragging);
                window.removeEventListener('mousedown', onDragStart);
            }
        }

        const onDragging = (e: MouseEvent) => {
            const newX = position.coords.x - startDragX + e.clientX;
            const newY = position.coords.y - startDragY + e.clientY;
            position.setNewCoords({x: newX, y: newY});
        }

        const onDragEnd = (e: MouseEvent) => {
            const newX = position.coords.x - startDragX + e.clientX;
            const newY = position.coords.y - startDragY + e.clientY;
            window.removeEventListener('mousemove', onDragging);
            position.setNewCoords({x: newX, y: newY});
            onEnd(newX, newY);
        }

        if (objectView.ref?.current)
            objectView.ref?.current.addEventListener('mousedown', onDragStart, {
                once: true,
            });

        return () => {
            if (objectView.ref?.current)
                objectView.ref.current.removeEventListener('mousedown', onDragStart);
        };
    })
}