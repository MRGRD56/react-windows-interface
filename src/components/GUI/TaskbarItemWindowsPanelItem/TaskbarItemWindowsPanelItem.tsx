import React, {FC, useMemo, useRef, useState} from "react";
import "./TaskbarItemWindowsPanelItem.scss";
import IWindow from "../../../models/windows/IWindow";
import WindowPreview from "../WindowPreview/WindowPreview";
import useActions from "../../../hooks/useActions";
import closeIcon from "../../../assets/img/OS/window/window_close.svg";

interface Props {
    window: IWindow
}

const TaskbarItemWindowsPanelItem: FC<Props> = props => {
    const [previewWidth, setPreviewWidth] = useState<number>();
    const {focusWindow, closePopups} = useActions();

    function onClick() {
        focusWindow(props.window);
        closePopups();
    }

    return (
        <div className="taskbar-item-windows-panel-item-wrapper">
            <button className="taskbar-item-windows-panel-item-close-button">
                <img src={closeIcon}/>
            </button>
            <button className="taskbar-item-windows-panel-item" onClick={onClick}>
                <div className="taskbar-item-windows-panel-item-header" style={{width: previewWidth}}>
                    <img className="taskbar-item-windows-panel-item-header-icon" src={props.window.iconSrc}/>
                    <div className="taskbar-item-windows-panel-item-header-label">
                        {props.window.title}
                    </div>
                </div>
                <div className="taskbar-item-windows-panel-item-preview" style={{width: previewWidth}}>
                    <WindowPreview window={props.window} onScale={setPreviewWidth}/>
                </div>
            </button>
        </div>
    );
};

export default TaskbarItemWindowsPanelItem;
