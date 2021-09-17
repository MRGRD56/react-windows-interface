import Taskbar from "../../models/store/windows/Taskbar";
import TaskbarAction from "../../models/store/windows/TaskbarAction";
import TaskbarActionType from "../../models/store/windows/TaskbarActionType";
import explorerPng from "../../assets/img/programs/explorer.png";
import IWindow from "../../models/windows/IWindow";

const defaultState: Taskbar = {
    items: [
        {
            file: {
                name: "Explorer",
                file: {
                    name: "explorer.exe",
                    iconSrc: explorerPng,
                    getWindow: () => {
                        return {
                            id: 1,
                            isMaximized:
                        }
                    }
                }
            }
        }
    ]
};

const taskbarReducer = (state: Taskbar | undefined, action: TaskbarAction): Taskbar => {
    if (!state) return defaultState;

    switch (action.type) {
    case TaskbarActionType.openNewWindow:
        break;
    case TaskbarActionType.closeWindow:
        break;
    case TaskbarActionType.maximizeWindow:
        break;
    case TaskbarActionType.minimizeWindow:
        break;
    case TaskbarActionType.focusWindow:
        break;
    default:
        return state;
    }
};

export default taskbarReducer;
