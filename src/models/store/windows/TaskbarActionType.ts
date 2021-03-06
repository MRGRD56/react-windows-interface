enum TaskbarActionType {
    openFile = "OPEN_NEW_WINDOW",
    closeWindow = "CLOSE_WINDOW",
    maximizeWindow = "MAXIMIZE_WINDOW",
    minimizeWindow = "MINIMIZE_WINDOW",
    focusWindow = "FOCUS_WINDOW",
    moveWindow = "MOVE_WINDOW",
    clickTaskbarItem = "CLICK_TASKBAR_ITEM",
    showTaskbarWindowsPanel = "SHOW_TASKBAR_WINDOWS_PANEL",
    showTaskbarContextMenu = "SHOW_TASKBAR_CONTEXT_MENU",
    pinTaskbarItem = "PIN_TASKBAR_ITEM",
    closePopups = "CLOSE_POPUPS",
    closeTaskbarItem = "CLOSE_TASKBAR_ITEM"
}

export default TaskbarActionType;
