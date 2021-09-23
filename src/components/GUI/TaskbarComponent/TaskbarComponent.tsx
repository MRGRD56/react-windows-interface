import React, {MouseEventHandler, useEffect, useMemo, useRef} from "react";
import Taskbar from "../../../models/store/windows/Taskbar";
import "./TaskbarComponent.scss";
import startIcon from "../../../assets/img/OS/system_start.svg";
import searchIcon from "../../../assets/img/OS/system_search.svg";
import trayWifiIcon from "../../../assets/img/OS/system_tray_wifi.png";
import traySoundIcon from "../../../assets/img/OS/system_tray_volume.png";
import chargingIcon from "../../../assets/img/OS/system_tray_charging.png";
import moreIcon from "../../../assets/img/OS/system_tray_more.png";
import notificationsIcon from "../../../assets/img/OS/system_tray_notifications-has.png";
import useActions from "../../../hooks/useActions";
import {classes} from "mg-values";
import Clock from "../Clock/Clock";
import TaskbarItemComponent from "../TaskbarItemComponent/TaskbarItemComponent";
import useTooltips from "../../../hooks/useTooltips";
import TaskbarItem from "../../../models/windows/TaskbarItem";

interface Props {
    taskbar: Taskbar
}

const TaskbarComponent = ({taskbar, ...props}: Props) => {
    const {openFile, showTaskbarWindowsPanel} = useActions();
    const activeItem = useMemo(() => {
        return taskbar.getActiveItem();
    }, [taskbar.items]);
    const tooltips = useTooltips(isTooltipsMode => {
        if (!isTooltipsMode) {
            showTaskbarWindowsPanel(null);
        }
    });

    function onItemMouseEnter(e: React.MouseEvent<HTMLButtonElement>, item: TaskbarItem) {
        if (tooltips.isTooltipsMode) {
            if (!item.isWindowsPanelShown) {
                showTaskbarWindowsPanel(item);
            }
        } else {
            tooltips.startTooltipsTimer(() => {
                showTaskbarWindowsPanel(item);
            });
        }
    }

    function onItemMouseLeave(e: React.MouseEvent<HTMLButtonElement>, item: TaskbarItem) {
        tooltips.abortTooltipsTimer();
    }

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
                <div className="taskbar-left-programs"
                    onMouseLeave={() => {
                        tooltips.disableTooltipsMode();
                    }}>
                    {taskbar.items.map(item => (
                        <TaskbarItemComponent key={item.file.program} item={item} activeItem={activeItem}
                            onMouseEnter={e => onItemMouseEnter(e, item)}
                            onMouseLeave={e => onItemMouseLeave(e, item)}
                            disableTooltipsMode={tooltips.disableTooltipsMode}/>
                    ))}
                </div>
            </div>
            <div className="taskbar-right">
                <button className="tray-item">
                    <img className="unselectable tray-item-icon" src={moreIcon}/>
                </button>
                <button className="tray-item">
                    <img className="unselectable tray-item-icon" src={chargingIcon}/>
                </button>
                <button className="tray-item">
                    <img className="unselectable tray-item-icon" src={trayWifiIcon}/>
                </button>
                <button className="tray-item">
                    <img className="unselectable tray-item-icon" src={traySoundIcon}/>
                </button>
                <button className="tray-item" style={{padding: "0 6px"}}>
                    ENG
                </button>
                <button className="tray-item">
                    <Clock style={{textAlign: "center"}} format="HH:mm[\n]yyyy-MM-DD"/>
                </button>
                <button className="tray-item" style={{padding: "0 12px"}}>
                    <img className="unselectable tray-item-icon" src={notificationsIcon}/>
                </button>
                <button className="tray-item tray-item-show-desktop"/>
            </div>
        </div>
    );
};

export default TaskbarComponent;
