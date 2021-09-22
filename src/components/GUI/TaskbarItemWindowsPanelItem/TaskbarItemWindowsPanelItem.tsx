import React, {FC, useState} from "react";
import "./TaskbarItemWindowsPanelItem.scss";
import IWindow from "../../../models/windows/IWindow";
import WindowPreview from "../WindowPreview/WindowPreview";
import useActions from "../../../hooks/useActions";

interface Props {
    window: IWindow
}

const TaskbarItemWindowsPanelItem: FC<Props> = props => {
    const [previewWidth, setPreviewWidth] = useState<string | number>("100%");
    const {focusWindow, closePopups} = useActions();

    function onClick() {
        focusWindow(props.window);
        closePopups();
    }

    return (
        <button className="taskbar-item-windows-panel-item" onClick={onClick}>
            <div className="taskbar-item-windows-panel-item-header">
                <img className="taskbar-item-windows-panel-item-header-icon" src={props.window.iconSrc}/>
                <div className="taskbar-item-windows-panel-item-header-label">
                    {props.window.title}
                </div>
            </div>
            <div className="taskbar-item-windows-panel-item-preview" style={{width: previewWidth}}>
                <WindowPreview window={props.window} onScale={setPreviewWidth}/>
            </div>
        </button>
    );
};

export default TaskbarItemWindowsPanelItem;
