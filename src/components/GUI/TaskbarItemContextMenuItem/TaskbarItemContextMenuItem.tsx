import React, {FC, MouseEventHandler} from "react";

interface Props {
    icon?: string,
    label: string,
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const TaskbarItemContextMenuItem: FC<Props> = props => {
    return (
        <button className="taskbar-item-context-menu-item" onClick={props.onClick}>
            <img src={props.icon} className="taskbar-item-context-menu-item-icon"/>
            <div className="taskbar-item-context-menu-item-text">{props.label}</div>
        </button>
    );
};

export default TaskbarItemContextMenuItem;