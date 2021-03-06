import React, {MouseEventHandler} from "react";
import {DraggableCore, DraggableEventHandler} from "react-draggable";
import WindowTitleButton from "../WindowTitleButton/WindowTitleButton";
import windowMinimize from "../../../assets/img/OS/window/window_minimize.svg";
import windowMaximizeNormal from "../../../assets/img/OS/window/window_maximize_normal.svg";
import windowMaximizeMaximized from "../../../assets/img/OS/window/window_maximize_maximized.svg";
import windowClose from "../../../assets/img/OS/window/window_close.svg";
import "./WindowTitle.scss";
import IWindow from "../../../models/windows/IWindow";

interface Props {
    window: IWindow,
    onDrag?: DraggableEventHandler,
    onDragStart?: DraggableEventHandler,
    onDragStop?: DraggableEventHandler,
    onMinimizeClick?: MouseEventHandler
    onMaximizeClick?: MouseEventHandler,
    onCloseClick?: MouseEventHandler
}

const WindowTitle = ({window, onDrag, onDragStart, onDragStop,
    onMinimizeClick, onMaximizeClick, onCloseClick, ...props}: Props) => (
    <div className="window-title" {...props}>
        <DraggableCore onDrag={onDrag} onStart={onDragStart} onStop={onDragStop}>
            <div className="window-title-text-wrapper unselectable"
                onDoubleClick={onMaximizeClick}>
                <img src={window.iconSrc} className="window-title-icon"/>
                <span className="window-title-text">{window.title}</span>
            </div>
        </DraggableCore>
        <div className="window-title-buttons">
            <WindowTitleButton onClick={onMinimizeClick}>
                <img src={windowMinimize} width={10} height={10}/>
            </WindowTitleButton>
            <WindowTitleButton onClick={onMaximizeClick}>
                {window.isMaximized
                    ? <img src={windowMaximizeMaximized} width={10} height={10}/>
                    : <img src={windowMaximizeNormal} width={10} height={10}/>}
            </WindowTitleButton>
            <WindowTitleButton isCloseButton={true} onClick={onCloseClick}>
                <img src={windowClose} width={10} height={10}/>
            </WindowTitleButton>
        </div>
    </div>
);

export default WindowTitle;
