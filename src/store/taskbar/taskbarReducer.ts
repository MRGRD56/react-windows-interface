import Taskbar from "../../models/store/windows/Taskbar";
import TaskbarAction from "../../models/store/windows/TaskbarAction";
import TaskbarActionType from "../../models/store/windows/TaskbarActionType";
import explorerPng from "../../assets/img/programs/explorer.png";
import calcPng from "../../assets/img/programs/calc.png";
import Window from "../../models/windows/Window";
import Program from "../../models/windows/Program";
import {List} from "immutable";
import IWindow from "../../models/windows/IWindow";
import TaskbarItem from "../../models/windows/TaskbarItem";
import File from "../../models/windows/File";
import IRectangle from "../../models/2d/IRectangle";

function createTaskbarItem(fileName: string, iconSrc: string, windowTitle: string, program: Program): TaskbarItem {
    return {
        file: {
            name: fileName,
            iconSrc: iconSrc,
            getWindow: () => new Window(windowTitle, program),
            program: program
        },
        windows: List([]),
        isPinned: true
    };
}

const defaultState: Taskbar = {
    items: List([
        createTaskbarItem("explorer.exe", explorerPng, "Explorer", Program.explorer),
        createTaskbarItem("calc.exe", calcPng, "Calculator", Program.calc),
    ])
};

function getTaskbarWithFile(taskbar: Taskbar, file: File): Taskbar {
    let items: List<TaskbarItem>;
    const existingTaskbarItemIndex = taskbar.items.findIndex(
        item => item.windows.some(w => w.program == file.program));

    if (existingTaskbarItemIndex === -1) {
        items = taskbar.items.push({
            file,
            windows: List([file.getWindow()]),
            isPinned: false
        });
    } else {
        items = taskbar.items.map((item, index) => {
            return index !== existingTaskbarItemIndex ? item : {
                ...item,
                windows: item.windows.push(file.getWindow())
            };
        });
    }

    return {
        ...taskbar,
        items
    };
}

function getTaskbarWithoutWindow(taskbar: Taskbar, window: IWindow): Taskbar {
    const taskbarItemIndex = taskbar.items.findIndex(
        item => item.windows.some(w => w === window));
    const taskbarItem = taskbar.items.get(taskbarItemIndex);
    if (taskbarItemIndex === -1 || !taskbarItem) return taskbar;

    const isWindowSingle = taskbarItem.windows.size === 1;
    const items = isWindowSingle && !taskbarItem.isPinned
        ? taskbar.items.delete(taskbarItemIndex)
        : taskbar.items.map((item, index) => {
            if (index !== taskbarItemIndex) return item;
            return {
                ...item,
                windows: item.windows.delete(item.windows.indexOf(window))
            }
        });

    return {
        ...taskbar,
        items
    }
}

type WindowOptions =
    {isMaximized: boolean} |
    {isMinimized: boolean} |
    {rectangle: IRectangle} |
    {zIndex: number};

function getTaskbarWithChangedWindow(taskbar: Taskbar, window: IWindow, newWindowOptions: WindowOptions): Taskbar {
    return {
        ...taskbar,
        items: taskbar.items.map(item => {
            return {
                ...item,
                windows: item.windows.map(w => {
                    if (w !== window) return w;
                    return {
                        ...w,
                        ...newWindowOptions
                    }
                })
            }
        })
    };
}

const taskbarReducer = (state: Taskbar | undefined, action: TaskbarAction): Taskbar => {
    if (!state) return defaultState;

    switch (action.type) {
        case TaskbarActionType.openFile:
            return getTaskbarWithFile(state, action.payload.file);
        case TaskbarActionType.closeWindow:
            return getTaskbarWithoutWindow(state, action.payload.window);
        case TaskbarActionType.maximizeWindow:
            return getTaskbarWithChangedWindow(state, action.payload.window, {
                isMaximized: action.payload.isMaximized
            });
        case TaskbarActionType.minimizeWindow:
            return getTaskbarWithChangedWindow(state, action.payload.window, {
                isMinimized: action.payload.isMinimized
            });
        case TaskbarActionType.focusWindow:
            return getTaskbarWithChangedWindow(state, action.payload.window, {
                zIndex: ++Window.lastZIndex
            });
        case TaskbarActionType.moveWindow:
            return getTaskbarWithChangedWindow(state, action.payload.window, {
                rectangle: action.payload.rectangle
            });
        default:
            return state;
    }
};


export default taskbarReducer;
