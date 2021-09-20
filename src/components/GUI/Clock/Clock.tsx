import React, {FC, HTMLProps, useEffect, useState} from "react";
import moment from "moment";

interface Props extends HTMLProps<HTMLDivElement> {
    format: string
}

const Clock: FC<Props> = ({children, style, ...props}) => {
    const getTime = () => moment().format(props.format).replace("\\n", "\n");
    const [time, setTime] = useState<string>(getTime());

    useEffect(() => {
        setInterval(() => {
            const newTime = getTime();
            if (time !== newTime) {
                setTime(newTime);
            }
        }, 1000);
    }, []);

    return (
        <div {...props} style={{whiteSpace: "pre", ...style}}>
            {time}
        </div>
    );
};

export default Clock;
