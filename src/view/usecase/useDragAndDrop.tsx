import React, {MutableRefObject} from "react";

interface Coords {
    x: number;
    y: number;
}
export function useDragAndDrop(coords: Coords, setNewCoords: Function, ref: MutableRefObject<HTMLDivElement>, isSelected: boolean, onEnd: Function) {
    let startDragX = 0;
    let startDragY = 0;

    React.useLayoutEffect(() => {
        ref.current.style.left = `${coords.x}px`
        ref.current.style.top = `${coords.y}px`
    }, [coords, setNewCoords]);

    React.useEffect(() => {
        const onDragging = (e: MouseEvent) => {
            console.log('dragging', e.clientX, e.clientY)
            const newX = coords.x - startDragX + e.clientX;
            const newY = coords.y - startDragY + e.clientY;
            setNewCoords({x: newX, y: newY});
        }

        const onDragEnd = (e: MouseEvent) => {
            const newX = coords.x - startDragX + e.clientX;
            const newY = coords.y - startDragY + e.clientY;
            console.log('end dragging on', e.clientX, e.clientY)
            window.removeEventListener('mousemove', onDragging);
            setNewCoords({x: newX, y: newY});
            onEnd(newX, newY);
        }
        const onDragStart = (e: MouseEvent) => {
            if (!e.defaultPrevented && isSelected) {
                e.preventDefault();

                startDragX = e.clientX;
                startDragY = e.clientY;
                console.log('start dragging from', {startDragX, startDragY})
                window.addEventListener('mouseup', onDragEnd, {once: true});
                window.addEventListener('mousemove', onDragging);
            }
        }

        if (ref.current)
            ref.current.addEventListener('mousedown', onDragStart, {
                once: true,
            });

        return () => {
            if (ref.current)
                ref.current.removeEventListener('mousedown', onDragStart);
        };
    })
}