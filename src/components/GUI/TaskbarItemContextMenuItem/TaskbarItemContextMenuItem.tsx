import React, {FC, MouseEventHandler} from "react";
import "./TaskbarItemContextMenuItem.scss";
import {classes} from "mg-values";

interface Props {
    icon?: string,
    label: string,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    isSingleColor?: boolean,
    iconSize?: number
}

const TaskbarItemContextMenuItem: FC<Props> = props => {
    return (
        <button className="taskbar-item-context-menu-item" onClick={props.onClick}>
            <div className="taskbar-item-context-menu-item-content">
                <div className="taskbar-item-context-menu-item-icon-wrapper">
                    <img src={props.icon}
                        style={{width: props.iconSize ?? 16, height: props.iconSize ?? 16}}
                        className={classes({
                            "single-color": () => props.isSingleColor === true
                        }, "taskbar-item-context-menu-item-icon")}/>
                </div>
                <div className="taskbar-item-context-menu-item-text">{props.label}</div>
            </div>
        </button>
    );
};

export default TaskbarItemContextMenuItem;
