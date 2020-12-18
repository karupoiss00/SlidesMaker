import React, {useEffect, useRef, useState} from "react";
import {SlidePictureData, SlidesMaker} from "../../model/SlidesMaker";
import {addPictureFromUrl} from "../../usecase/pictureUploader";
import styles from "./Panel.module.css";
import AddWebPictureIcon from "./res/pictures/addWebPic.svg";
import {Button} from "../controls/Button";

interface TextInputProps {
    fnToPayloadPicture: (slidesMaker: SlidesMaker, data: SlidePictureData) => SlidesMaker;
    value: string;
}

function TextInput(props: TextInputProps) {
    const [text, setText] = useState(props.value);
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(ref.current)
        {
            ref.current.value = text;
        }

    }, [text, setText]);

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
        }}>
            <input type="text"
                   ref={ref}
                   onChange={(e) => {
                       setText(e.target.value)
                   }}
                   value={text}
                   style={{
                       height: "50%"
                   }}
            />
            <Button
                className={styles.panelSquareButton}
                onClick={() => {
                    if (ref
                        && ref.current)
                    {
                        addPictureFromUrl(ref.current.value, props.fnToPayloadPicture);
                    }
                }} >
                <img src={AddWebPictureIcon} alt={"Oops!"}/>
            </Button>
        </div>
    )
}

export  {TextInput}