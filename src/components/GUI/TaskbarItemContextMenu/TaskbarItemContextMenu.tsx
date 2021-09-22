import React, {FC, MouseEventHandler} from "react";
import TaskbarItem from "../../../models/windows/TaskbarItem";
import "./TaskbarItemContextMenu.scss";
import TaskbarItemContextMenuItem from "../TaskbarItemContextMenuItem/TaskbarItemContextMenuItem";
import closeIcon from "../../../assets/img/OS/window/window_close.svg";
import pinIcon from "../../../assets/img/OS/window/window_pin.png";
import unpinIcon from "../../../assets/img/OS/window/window_unpin.png";
import useActions from "../../../hooks/useActions";

interface Props {
    taskbarItem: TaskbarItem
}

const TaskbarItemContextMenu: FC<Props> = ({taskbarItem}) => {
    const {openFile, pinTaskbarItem, closeTaskbarItem, closePopups} = useActions();

    const onMouseDown: MouseEventHandler<HTMLDivElement> = e => {
        e.stopPropagation();
    };

    if (!taskbarItem.isContextMenuShown) return <></>;

    function openNewWindow() {
        openFile(taskbarItem.file);
        closePopups();
    }

    function togglePin() {
        pinTaskbarItem(taskbarItem, !taskbarItem.isPinned);
        closePopups();
    }

    function closeAllWindows() {
        closeTaskbarItem(taskbarItem);
        closePopups();
    }

    return (
        <div className="taskbar-item-context-menu acrylic" onMouseDown={onMouseDown}>
            <TaskbarItemContextMenuItem icon={taskbarItem.file.iconSrc} label={taskbarItem.file.name}
                onClick={openNewWindow}/>
            <TaskbarItemContextMenuItem icon={taskbarItem.isPinned ? unpinIcon : pinIcon} label={taskbarItem.isPinned ? "Unpin" : "Pin"}
                onClick={togglePin}/>
            {taskbarItem.windows.size ? (
                <TaskbarItemContextMenuItem icon={closeIcon} iconSize={12} isSingleColor
                    label={taskbarItem.windows.size === 1 ? "Close window" : "Close all windows"}
                    onClick={closeAllWindows}/>
            ) : ""}
        </div>
    );
};

export default TaskbarItemContextMenu;
