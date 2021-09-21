import React, {FC} from "react";
import TaskbarItem from "../../../models/windows/TaskbarItem";
import "./TaskbarItemContextMenu.scss";
import TaskbarItemContextMenuItem from "../TaskbarItemContextMenuItem/TaskbarItemContextMenuItem";

interface Props {
    taskbarItem: TaskbarItem
}

const TaskbarItemContextMenu: FC<Props> = ({taskbarItem, ...props}) => {
    if (!taskbarItem.isContextMenuShown) return <></>;

    return (
        <div className="taskbar-item-context-menu acrylic">
            <TaskbarItemContextMenuItem icon={taskbarItem.file.iconSrc} label={taskbarItem.file.name}/>
            <TaskbarItemContextMenuItem icon={undefined} label={taskbarItem.isPinned ? "Unpin" : "Pin"}/>
            {taskbarItem.windows.size ? (
                <TaskbarItemContextMenuItem icon={undefined} label={taskbarItem.windows.size === 1 ? "Close window" : "Close all windows"}/>
            ) : ""}
        </div>
    );
};

export default TaskbarItemContextMenu;