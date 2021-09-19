import React from "react";
import Taskbar from "../../../models/store/windows/Taskbar";
import "./TaskbarComponent.scss";
import startIcon from "../../../assets/img/OS/system_start.svg";
import searchIcon from "../../../assets/img/OS/system_search.svg";
import useActions from "../../../hooks/useActions";
import {classes} from "mg-values";

interface Props {
    taskbar: Taskbar
}

const TaskbarComponent = ({taskbar, ...props}: Props) => {
    const {openFile} = useActions();

    return (
        <div className="taskbar acrylic">
            <div className="taskbar-left">
                <div className="taskbar-item">
                    <div className="taskbar-item-content">
                        <img className="unselectable taskbar-item-icon taskbar-item-system-icon taskbar-item-start-icon single-color" src={startIcon}/>
                    </div>
                </div>
                <div className="taskbar-item">
                    <div className="taskbar-item-content">
                        <img className="unselectable taskbar-item-icon taskbar-item-system-icon single-color" src={searchIcon}/>
                    </div>
                </div>
                {taskbar.items.map(item => (
                    <div key={item.file.name} className={classes({
                        "taskbar-item-open": () => item.windows.size > 0
                    }, "taskbar-item")} onClick={() => openFile(item.file)}>
                        <div className="taskbar-item-content">
                            <img className="unselectable taskbar-item-icon" src={item.file.iconSrc}/>
                        </div>
                    </div>
                ))}
            </div>
            <div>

            </div>
        </div>
    );
};

export default TaskbarComponent;
