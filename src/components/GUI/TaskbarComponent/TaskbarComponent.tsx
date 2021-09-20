import React, {useMemo} from "react";
import Taskbar from "../../../models/store/windows/Taskbar";
import "./TaskbarComponent.scss";
import startIcon from "../../../assets/img/OS/system_start.svg";
import searchIcon from "../../../assets/img/OS/system_search.svg";
import trayWifiIcon from "../../../assets/img/OS/system_tray_wifi.svg";
import traySoundIcon from "../../../assets/img/OS/system_tray_sound.svg";
import useActions from "../../../hooks/useActions";
import {classes} from "mg-values";
import Clock from "../Clock/Clock";

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
                <button className="tray-item">
                    <img className="unselectable tray-item-icon" src={traySoundIcon}/>
                </button>
                <button className="tray-item">
                    <img className="unselectable tray-item-icon" src={trayWifiIcon}/>
                </button>
                <button className="tray-item">
                    ENG
                </button>
                <button className="tray-item">
                    <Clock style={{textAlign: "center"}} format="HH:mm[\n]yyyy-MM-DD"/>
                </button>
                <button className="tray-item tray-item-minimize-all"/>
            </div>
        </div>
    );
};

export default TaskbarComponent;
