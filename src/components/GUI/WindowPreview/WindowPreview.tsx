import React, {FC, useEffect, useRef} from "react";
import IWindow from "../../../models/windows/IWindow";
import {classes} from "mg-values/index";
import WindowResizeBorders from "../WindowResizeBorders/WindowResizeBorders";
import WindowTitle from "../WindowTitle/WindowTitle";
import Size from "../../../models/2d/Size";
import "./WindowPreview.scss";
import ISize from "../../../models/2d/ISize";
import {fitObject} from "mg-image-fit";

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
        const parentSize = new Size(200, parent.offsetHeight);
        const fit = fitObject(currentSize, parentSize);
        if (fit.scale >= 1) return;

        const translatePercentage = -50 * fit.scale + "%";
        element.style.transform = `translate(${translatePercentage}, ${translatePercentage}) scale(${fit.scale})`;
        const actualHeight = currentSize.height * fit.scale;
        const windowSize = props.window.rectangle.size;
        let width: number | string = actualHeight * (windowSize.width / windowSize.height);
        if (width < 84) {
            width = "100%";
        }
        if (width > 200) {
            width = 200;
        }
        props.onScale?.(width);
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
