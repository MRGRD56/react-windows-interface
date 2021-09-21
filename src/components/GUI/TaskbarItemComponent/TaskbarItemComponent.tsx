import React, {FC} from "react";
import TaskbarItem from "../../../models/windows/TaskbarItem";
import {classes} from "mg-values/index";
import useActions from "../../../hooks/useActions";
import "./TaskbarItemComponent.scss";

interface Props {
    item: TaskbarItem,
    activeItem: TaskbarItem | null
}

const TaskbarItemComponent: FC<Props> = ({item, activeItem, ...props}) => {
    const {openFile, clickTaskbarItem} = useActions();

    return (
        <button key={item.file.name} className={classes({
            "taskbar-item-open": () => item.windows.size === 1,
            "taskbar-item-open-multiple": () => item.windows.size > 1,
            "taskbar-item-active": () => item === activeItem
        }, "taskbar-item")} onClick={() => clickTaskbarItem(item)}>
            <img className="unselectable taskbar-item-icon" src={item.file.iconSrc}/>
        </button>
    );
};

export default TaskbarItemComponent;