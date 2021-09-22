import React, {FC} from "react";
import TaskbarItem from "../../../models/windows/TaskbarItem";
import "./TaskbarItemWindowsPanel.scss";
import TaskbarItemWindowsPanelItem from "../TaskbarItemWindowsPanelItem/TaskbarItemWindowsPanelItem";

interface Props {
    taskbarItem: TaskbarItem
}

const TaskbarItemWindowsPanel: FC<Props> = props => {
    if (!props.taskbarItem.isWindowsPanelShown) return null;

    return (
        <div className="taskbar-item-windows-panel" onMouseDown={e => e.stopPropagation()}>
            {props.taskbarItem.windows.map(w => (
                <TaskbarItemWindowsPanelItem key={w.id} window={w}/>
            ))}
        </div>
    );
};

export default TaskbarItemWindowsPanel;