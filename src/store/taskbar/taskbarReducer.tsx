import Taskbar from "../../models/store/windows/Taskbar";
import TaskbarAction from "../../models/store/windows/TaskbarAction";
import TaskbarActionType from "../../models/store/windows/TaskbarActionType";
import settingsIcon from "../../assets/img/programs/settings_dark.png";
import explorerIcon from "../../assets/img/programs/explorer.png";
import calcIcon from "../../assets/img/programs/calc.png";
import Window from "../../models/windows/Window";
import Program from "../../models/windows/Program";
import {List} from "immutable";
import IWindow from "../../models/windows/IWindow";
import TaskbarItem from "../../models/windows/TaskbarItem";
import File from "../../models/windows/File";
import IRectangle from "../../models/2d/IRectangle";
import Calculator from "../../components/programs/Calculator/Calculator";
import Rectangle from "../../models/2d/Rectangle";
import Size from "../../models/2d/Size";
import {ReactNode} from "react";
import ISize from "../../models/2d/ISize";

function createTaskbarItem(fileName: string, iconSrc: string, windowTitle: string, program: Program,
    content?: ReactNode, rectangle?: IRectangle, minSize?: ISize): TaskbarItem {
    return {
        file: {
            name: fileName,
            iconSrc: iconSrc,
            getWindow: () => new Window(windowTitle, program, content, rectangle, minSize, iconSrc),
            program: program
        },
        windows: List([]),
        isPinned: true
    };
}

const defaultState: Taskbar = new Taskbar([
    createTaskbarItem("settings.exe", settingsIcon, "Settings", Program.settings),
    createTaskbarItem("explorer.exe", explorerIcon, "Explorer", Program.explorer),
    createTaskbarItem("calc.exe", calcIcon, "Calculator", Program.calc,
        <Calculator/>,
        Rectangle.getScreenCenter(new Size(300, 500)),
        new Size(300, 500))
]);

function getTaskbarWithFile(taskbar: Taskbar, file: File): Taskbar {
    let items: List<TaskbarItem>;
    const existingTaskbarItemIndex = taskbar.items.findIndex(
        item => item.file.program === file.program);

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

    return new Taskbar(items);
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
            };
        });

    return new Taskbar(items);
}

type WindowOptions = {
    isMaximized?: boolean,
    isMinimized?: boolean,
    rectangle?: IRectangle,
    zIndex?: number
}

function getTaskbarWithChangedWindow(taskbar: Taskbar, window: IWindow, newWindowOptions: WindowOptions): Taskbar {
    return new Taskbar(taskbar.items.map(item => {
        return {
            ...item,
            windows: item.windows.map(w => {
                if (w.id !== window.id) return w;
                return {
                    ...w,
                    ...newWindowOptions
                };
            })
        };
    }));
}

function getTaskbarWithOpenWindowsPanel(taskbar: Taskbar, item: TaskbarItem | null): Taskbar {
    return new Taskbar(taskbar.items.map(it => {
        return {
            ...it,
            isWindowsPanelOpen: item ? it === item : undefined
        }
    }));
}

function getTaskbarWithHandledClick(taskbar: Taskbar, item: TaskbarItem): Taskbar {
    if (!item.windows.size) {
        return getTaskbarWithFile(taskbar, item.file);
    }

    if (item.windows.size === 1) {
        const window = item.windows.get(0)!;
        if (window.id === taskbar.getFocusedWindow()?.id) {
            return getTaskbarWithChangedWindow(taskbar, window, {
                isMinimized: !window.isMinimized
            });
        } else {
            return getTaskbarWithChangedWindow(taskbar, window, {
                isMinimized: false,
                zIndex: ++Window.lastZIndex
            });
        }
    }

    return getTaskbarWithOpenWindowsPanel(taskbar, item);
}

const taskbarReducer = (state: Taskbar | undefined, action: TaskbarAction): Taskbar => {
    if (!state) return defaultState;

    switch (action.type) {
        case TaskbarActionType.clickTaskbarItem:
            return getTaskbarWithHandledClick(state, action.payload.taskbarItem);
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
            if (action.payload.window.zIndex === Window.lastZIndex) return state;
            return getTaskbarWithChangedWindow(state, action.payload.window, {
                zIndex: ++Window.lastZIndex
            });
        case TaskbarActionType.moveWindow:
            return getTaskbarWithChangedWindow(state, action.payload.window, {
                rectangle: action.payload.rectangle
            });
        case TaskbarActionType.showTaskbarWindowsPanel:
            return getTaskbarWithOpenWindowsPanel(state, action.payload.taskbarItem);
        default:
            return state;
    }
};


export default taskbarReducer;
