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

function WindowTitle({window, onDrag, onDragStart, onDragStop,
    onMinimizeClick, onMaximizeClick, onCloseClick, ...props}: Props) {
    return (
        <div className="window-title" {...props}>
            <DraggableCore onDrag={onDrag} onStart={onDragStart} onStop={onDragStop}>
                <div className="window-title-text unselectable"
                    onDoubleClick={onMaximizeClick}>
                    <img src={window.iconSrc} className="window-title-icon"/>
                    {window.title}
                </div>
            </DraggableCore>
            <div className="d-flex flex-nowrap">
                <WindowTitleButton onClick={onMinimizeClick}>
                    <i className="material-icons">
                        <img src={windowMinimize} width={10} height={10}/>
                    </i>
                </WindowTitleButton>
                <WindowTitleButton onClick={onMaximizeClick}>
                    <i className="material-icons">
                        {window.isMaximized
                            ? <img src={windowMaximizeMaximized} width={10} height={10}/>
                            : <img src={windowMaximizeNormal} width={10} height={10}/>}
                    </i>
                </WindowTitleButton>
                <WindowTitleButton isCloseButton={true} onClick={onCloseClick}>
                    <i className="material-icons">
                        <img src={windowClose} width={10} height={10}/>
                    </i>
                </WindowTitleButton>
            </div>
        </div>
    );
}

export default WindowTitle;
