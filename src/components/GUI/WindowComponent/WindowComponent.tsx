import React, {useMemo, useRef} from "react";
import IWindow from "../../../models/windows/IWindow";
import {classes} from "mg-values";
import Rectangle from "../../../models/2d/Rectangle";
import WindowResizeBorders from "../WindowResizeBorders/WindowResizeBorders";
import WindowTitle from "../WindowTitle/WindowTitle";
import Size from "../../../models/2d/Size";
import useActions from "../../../hooks/useActions";
import Point from "../../../models/2d/Point";
import Side from "../../../models/2d/Side";
import "./WindowComponent.scss";

interface Props {
    window: IWindow,
    focusedWindow: IWindow | null
}

const WindowComponent = ({window, focusedWindow, ...props}: Props) => {
    const currentWindow = useMemo(() => window, [window]);
    const isFocused = useMemo(() => currentWindow === focusedWindow, [currentWindow, focusedWindow]);

    const {
        closeWindow,
        focusWindow,
        maximizeWindow,
        minimizeWindow,
        moveWindow,
        openFile
    } = useActions();

    function toggleIsMaximized() {
        maximizeWindow(currentWindow, !currentWindow.isMaximized);
    }

    const onDrag = (e: any) => {
        const [x, y] = [e.movementX, e.movementY];
        const newRectangle = new Rectangle(
            new Point(currentWindow.rectangle.point.x + x, currentWindow.rectangle.point.y + y),
            currentWindow.rectangle.size);
        moveWindow(currentWindow, newRectangle);

        if (currentWindow.isMaximized) {
            const titleButtonsWidth = 138;
            const draggableAreaWidth = currentWindow.rectangle.size.width - titleButtonsWidth - 10;
            const newXPos = e.clientX - Math.min(e.clientX, draggableAreaWidth);
            const newRectangle = new Rectangle(
                new Point(newXPos, 0),
                currentWindow.rectangle.size);
            moveWindow(currentWindow, newRectangle);
            maximizeWindow(currentWindow, false);
        }
    };

    const onDragStop = (e: any) => {
        if (!currentWindow.isMaximized && e.clientY <= 0) {
            toggleIsMaximized();
        }
        if (currentWindow.rectangle.point.y < 0) {
            const newRectangle = new Rectangle(new Point(currentWindow.rectangle.point.x, 0), currentWindow.rectangle.size);
            moveWindow(currentWindow, newRectangle);
        }
    };

    function onResize(e: any, side: Side) {
        if (currentWindow.isMaximized) return;

        const [isTop, isRight, isBottom, isLeft] = [
            (side & Side.top) === Side.top,
            (side & Side.right) === Side.right,
            (side & Side.bottom) === Side.bottom,
            (side & Side.left) === Side.left
        ];

        let [x, y] = [e.movementX, e.movementY];
        const sizeIncrement = new Size(0, 0);
        const pointIncrement = new Point(0, 0);

        if (!(isTop && isRight
            || isRight && isBottom
            || isBottom && isLeft
            || isLeft && isTop)) {
            if (isTop || isBottom) {
                x = 0;
            }
            if (isLeft || isRight) {
                y = 0;
            }
        }

        //Right, Bottom or Bottom-Right
        if (isBottom && !isLeft || isRight && !isTop) {
            sizeIncrement.width = x;
            sizeIncrement.height = y;
        }
        //Top, Left or Top-Left
        else if (isTop && !isRight || isLeft && !isBottom) {
            pointIncrement.x = x;
            pointIncrement.y = y;
            sizeIncrement.width = -x;
            sizeIncrement.height = -y;
        }
        //Top-Right
        else if (isTop && isRight) {
            pointIncrement.y = y;
            sizeIncrement.height = -y;
            sizeIncrement.width = x;
        }
        //Bottom-Left
        else if (isBottom && isLeft) {
            pointIncrement.x = x;
            sizeIncrement.width = -x;
            sizeIncrement.height = y;
        }

        const newRectangle = new Rectangle(
            new Point(
                currentWindow.rectangle.point.x + pointIncrement.x,
                currentWindow.rectangle.point.y + pointIncrement.y
            ),
            new Size(
                currentWindow.rectangle.size.width + sizeIncrement.width,
                currentWindow.rectangle.size.height + sizeIncrement.height));

        //FIXME
        // if (pointIncrement.x !== 0 || pointIncrement.y !== 0) {
        //     if (newRectangle.size.width <= getMinSize().width) {
        //         console.log(rectangle, newRectangle);
        //         newRectangle.point.x = rectangle.point.x + Math.min(Math.abs(newRectangle.size.width - getMinSize().width), x);
        //     }
        //     if (newRectangle.size.height <= getMinSize().height) {
        //         newRectangle.point.y = rectangle.point.y;
        //     }
        // }

        moveWindow(currentWindow, newRectangle);
    }

    const isResizing = useRef(false);

    function onResizeStart() {
        isResizing.current = true;
    }

    function onResizeStop() {
        isResizing.current = false;
        if (currentWindow.rectangle.point.y < 0) {
            const newRectangle = new Rectangle(
                new Point(
                    currentWindow.rectangle.point.x,
                    0),
                new Size(
                    currentWindow.rectangle.size.width,
                    currentWindow.rectangle.size.height + currentWindow.rectangle.point.y));
            moveWindow(currentWindow, newRectangle);
        }
        if (currentWindow.rectangle.size.width < getMinSize().width
            || currentWindow.rectangle.size.height < getMinSize().height) {
            const newRectangle = new Rectangle(
                currentWindow.rectangle.point,
                new Size(
                    Math.max(currentWindow.rectangle.size.width, getMinSize().width),
                    Math.max(currentWindow.rectangle.size.height, getMinSize().height))
            );
            moveWindow(currentWindow, newRectangle);
        }
    }

    function onMouseDown() {
        focusWindow(currentWindow);
    }

    function onCloseClick() {
        closeWindow(currentWindow);
    }

    function onMinimizeClick() {
        minimizeWindow(currentWindow, !currentWindow.isMinimized);
    }

    function getMinSize(): Size {
        return new Size(Math.max(window.minSize?.width ?? 0, 146), Math.max(window.minSize?.height ?? 0, 32));
    }

    return (
        <div {...props}
            className={classes({
                "active acrylic": () => isFocused,
                "maximized": () => window.isMaximized,
                "minimized": () => window.isMinimized,
                "animated-short": () => false,
                "animated-normal": () => false,
                "closing": () => false
            }, "window")}
            style={{...Rectangle.getStyle(window.rectangle), minWidth: getMinSize().width,
                minHeight: getMinSize().height, zIndex: window.zIndex}}
            onMouseDown={onMouseDown}>
            <WindowResizeBorders onResize={onResize} onResizeStart={onResizeStart} onResizeStop={onResizeStop}/>
            <WindowTitle window={currentWindow} onDrag={onDrag} onDragStop={onDragStop}
                onMinimizeClick={onMinimizeClick} onMaximizeClick={toggleIsMaximized} onCloseClick={onCloseClick}/>
            <div className="window-content">
                {window.content}
            </div>
        </div>
    );
};

export default WindowComponent;
