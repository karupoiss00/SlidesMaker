import React, {ReactNode} from 'react'

interface ButtonProps {
    className: string;
    children?: ReactNode | string;
    onClick: () => void;
}

function Button(props: ButtonProps) {
    return (
        <button className={props.className}
                onClick={props.onClick}>{props.children}</button>
    )
}


export {
    Button,
}
