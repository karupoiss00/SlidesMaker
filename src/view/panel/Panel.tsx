import React from 'react'
interface PanelProps {
    className: string;
    panelBlockClassName: string;
}

function Panel(props: PanelProps) {
    return (
        <div className={props.className}>
            <div className={props.panelBlockClassName}>Presentation</div>
            <div className={props.panelBlockClassName}>TextBoxes</div>
            <div className={props.panelBlockClassName}>Shapes</div>
            <div className={props.panelBlockClassName}>Pictures</div>
        </div>
    )
}

export {
    Panel,
}
