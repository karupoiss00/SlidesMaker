import React from 'react'

interface ButtonProps {
    className: string;
    text: string;
    onClick: () => void;
}

function Button(props: ButtonProps) {
    return (
        <button className={props.className} onClick={props.onClick} >{props.text}</button>
    )
}


export {
    Button,
}
