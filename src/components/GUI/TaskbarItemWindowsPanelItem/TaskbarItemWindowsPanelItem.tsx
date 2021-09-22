import React, {FC, useState} from "react";
import "./TaskbarItemWindowsPanelItem.scss";
import IWindow from "../../../models/windows/IWindow";
import WindowPreview from "../WindowPreview/WindowPreview";

interface Props {
    window: IWindow
}

const TaskbarItemWindowsPanelItem: FC<Props> = props => {
    const [previewWidth, setPreviewWidth] = useState<string | number>("100%");

    return (
        <button className="taskbar-item-windows-panel-item">
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