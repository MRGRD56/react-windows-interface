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
    onScale?: (width: number) => void
}

const WindowPreview: FC<Props> = props => {
    const elementRef = useRef<HTMLDivElement>(null);

    function scaleElement() {
        const element = elementRef.current!;
        const parent = element.parentElement?.parentElement;
        if (!parent) return;

        const currentSize = new Size(element.offsetWidth, element.offsetHeight);
        const parentSize = new Size(200 - 16, parent.offsetHeight);
        const fit = fitObject(currentSize, parentSize);
        if (fit.scale >= 1) {
            fit.scale = 1;
        }

        const translatePercentage = -50 * fit.scale + "%";
        element.style.transform = `translate(${translatePercentage}, ${translatePercentage}) scale(${fit.scale})`;
        const actualHeight = currentSize.height * fit.scale;
        const windowSize = props.window.rectangle.size;
        let width: number | string = actualHeight * (windowSize.width / windowSize.height);
        if (width < 100 - 16) {
            width = 100 - 16;
        }
        if (width > 200 - 16) {
            width = 200 - 16;
        }
        props.onScale?.(width);
    }

    useEffect(() => {
        scaleElement();
    }, [props.window.rectangle.size]);

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
