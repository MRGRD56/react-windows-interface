import React, {FC, useEffect, useRef} from "react";
import IWindow from "../../../models/windows/IWindow";
import {classes} from "mg-values/index";
import WindowResizeBorders from "../WindowResizeBorders/WindowResizeBorders";
import WindowTitle from "../WindowTitle/WindowTitle";
import Size from "../../../models/2d/Size";
import "./WindowPreview.scss";
import ISize from "../../../models/2d/ISize";

interface Props {
    window: IWindow,
    onScale?: (width: number | string) => void
}

const WindowPreview: FC<Props> = props => {
    const elementRef = useRef<HTMLDivElement>(null);

    function scaleElement() {
        const element = elementRef.current!;
        const parent = element.parentElement?.parentElement;
        if (!parent) return;

        const currentSize = new Size(element.offsetWidth, element.offsetHeight);
        const parentSize = new Size(parent.offsetWidth, parent.offsetHeight);
        const heightMultiplier = parentSize.height / currentSize.height;
        const widthMultiplier = 200 / element.offsetHeight;
        const scaleMultiplier = heightMultiplier >= 1
            ? widthMultiplier
            : widthMultiplier >= 1
                ? widthMultiplier
                : Math.min(widthMultiplier, heightMultiplier);
        console.log(props.window.title + "W H S", widthMultiplier, heightMultiplier, scaleMultiplier);
        if (scaleMultiplier >= 1) return;

        const translatePercentage = -50 * scaleMultiplier + "%";
        element.style.transform = `translate(${translatePercentage}, ${translatePercentage}) scale(${scaleMultiplier})`;
        const actualHeight = currentSize.height * scaleMultiplier;
        const windowSize = props.window.rectangle.size;
        let width: number | string = actualHeight * (windowSize.width / windowSize.height);
        if (width < 84) {
            width = "100%";
        }
        if (width > 200) {
            width = 200;
        }
        props.onScale?.(width);
        console.log("onScale", width);

        //FIXME
    }

    useEffect(() => {
        scaleElement();
    }, []);

    return (
        <div className="window-preview-wrapper">
            <div className="window-preview" ref={elementRef}>
                <div className={classes({
                    "maximized": () => props.window.isMaximized
                })} style={Size.getStyle(props.window.rectangle.size)}>
                    <WindowResizeBorders/>
                    <WindowTitle window={props.window}/>
                    <div className="window-content">
                        {props.window.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WindowPreview;