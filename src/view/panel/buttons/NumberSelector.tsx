import React, {ReactNode} from "react";

interface NumberSelectorProps {
    optionsData: Array<number>;
    defaultNum: number;
    dispatchPickedOption: Function;
}

export function NumberSelector(props: NumberSelectorProps) {
    const options: Array<ReactNode> = [];
    for (let i = 0; i < props.optionsData.length; i++) {
        options.push(<option value={props.optionsData[i]} key={i}>{props.optionsData[i]}</option>);
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "auto",
        }}>
            <select
                value={props.defaultNum}
                onInput={(e) => {
                   const pickedOption: string = e.currentTarget.value;
                   props.dispatchPickedOption(pickedOption);
                }}
                style={{
                   height: "75%",
                   width: "auto",
                   marginLeft: "10px",
                   marginRight: "10px",
                }}>
                {options}
            </select>
        </div>
    )
}