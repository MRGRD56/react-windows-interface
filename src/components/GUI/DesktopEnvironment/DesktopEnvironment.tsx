import React, {FC, HTMLProps} from "react";
import {classes} from "mg-values";
import bg from "../../../assets/img/wallpapers/img19.jpg";
import "./DesktopEnvironment.scss";

const DesktopEnvironment: FC<HTMLProps<HTMLDivElement>> =
    ({children, className, style, ...props}) => {
        return (
            <div className={["de", className].join(" ")}
                style={{backgroundImage: `url(${bg})`, ...style}} {...props}>
            lorem
            </div>
        );
    };

export default DesktopEnvironment;
