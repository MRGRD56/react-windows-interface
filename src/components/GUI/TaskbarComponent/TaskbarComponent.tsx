import React, {useMemo} from "react";
import Taskbar from "../../../models/store/windows/Taskbar";
import "./TaskbarComponent.scss";
import startIcon from "../../../assets/img/OS/system_start.svg";
import searchIcon from "../../../assets/img/OS/system_search.svg";
import useActions from "../../../hooks/useActions";
import {classes} from "mg-values";
import Clock from "react-live-clock";
import moment from "moment";

interface Props {
    taskbar: Taskbar
}

const TaskbarComponent = ({taskbar, ...props}: Props) => {
    const {openFile} = useActions();
    const activeItem = useMemo(() => {
        return taskbar.getActiveItem();
    }, [taskbar.items]);

    return (
        <div className="taskbar acrylic">
            <div className="taskbar-left">
                <button className="taskbar-item">
                    <img className="unselectable taskbar-item-icon taskbar-item-system-icon taskbar-item-start-icon single-color" src={startIcon}/>
                </button>
                <button className="taskbar-item">
                    <img className="unselectable taskbar-item-icon taskbar-item-system-icon single-color" src={searchIcon}/>
                </button>
                <div style={{height: "100%", width: "3px"}}/>
                {taskbar.items.map(item => (
                    <button key={item.file.name} className={classes({
                        "taskbar-item-open": () => item.windows.size === 1,
                        "taskbar-item-open-multiple": () => item.windows.size > 1,
                        "taskbar-item-active": () => item === activeItem
                    }, "taskbar-item")} onClick={() => openFile(item.file)}>
                        <img className="unselectable taskbar-item-icon" src={item.file.iconSrc}/>
                    </button>
                ))}
            </div>
            <div className="taskbar-right">
                <button className="taskbar-item">
                    {/*<Clock format="HH:mm" timezone={moment..guess()}/>*/}
                    12:00
                    20.09.2021
                </button>
            </div>
        </div>
    );
};

export default TaskbarComponent;
