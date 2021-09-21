import React, {FC, MouseEventHandler} from "react";
import TaskbarItem from "../../../models/windows/TaskbarItem";
import {classes} from "mg-values/index";
import useActions from "../../../hooks/useActions";
import "./TaskbarItemComponent.scss";
import TaskbarItemContextMenu from "../TaskbarItemContextMenu/TaskbarItemContextMenu";
import {CSSTransition} from "react-transition-group";

interface Props {
    item: TaskbarItem,
    activeItem: TaskbarItem | null
}

const TaskbarItemComponent: FC<Props> = ({item, activeItem, ...props}) => {
    const {openFile, clickTaskbarItem, showTaskbarContextMenu} = useActions();

    const onAuxClick: MouseEventHandler<HTMLButtonElement> = e => {
        if (e.button !== 1) return;

        openFile(item.file);
    };

    const onContextMenu: MouseEventHandler<HTMLButtonElement> = e => {
        e.preventDefault();
        showTaskbarContextMenu(item);
    };

    return (
        <div className="taskbar-item-wrapper">
            <CSSTransition timeout={100} in={item.isContextMenuShown} classNames="taskbar-item-context-menu">
                <TaskbarItemContextMenu taskbarItem={item}/>
            </CSSTransition>
            <button key={item.file.name} className={classes({
                "taskbar-item-open": () => item.windows.size === 1,
                "taskbar-item-open-multiple": () => item.windows.size > 1,
                "taskbar-item-active": () => item === activeItem,
                "hover": () => item.isContextMenuShown === true
            }, "taskbar-item")}
            onClick={() => clickTaskbarItem(item)} onAuxClick={onAuxClick}
            onContextMenu={onContextMenu}>
                <img className="unselectable taskbar-item-icon" src={item.file.iconSrc}/>
            </button>
        </div>
    );
};

export default TaskbarItemComponent;
