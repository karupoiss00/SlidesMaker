import React, {RefObject, useState} from "react";

interface TextInputProps {
    ref: RefObject<HTMLInputElement>;
    value: string;
}

function TextInput(props: TextInputProps) {
    const [text, setText] = useState(props.value);
    return (
        <input type="text"
               ref={props.ref}
               onChange={(e) => {
                   setText(e.target.value)
               }}
               value={text}
               style={{
                   height: "50%"
               }}
        />
    )
}

export  {TextInput}