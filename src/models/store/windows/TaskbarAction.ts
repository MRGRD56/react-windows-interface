import AppAction from "../AppAction";
import TaskbarActionType from "./TaskbarActionType";
import IWindow from "../../windows/IWindow";
import File from "../../windows/File";
import IRectangle from "../../2d/IRectangle";
import TaskbarItem from "../../windows/TaskbarItem";

type OpenNewWindowAction = AppAction<TaskbarActionType.openFile, {file: File}>;
type CloseWindowAction = AppAction<TaskbarActionType.closeWindow, {window: IWindow}>;
type MaximizeWindowAction = AppAction<TaskbarActionType.maximizeWindow, {window: IWindow, isMaximized: boolean}>;
type MinimizeWindowAction = AppAction<TaskbarActionType.minimizeWindow, {window: IWindow, isMinimized: boolean}>;
type FocusWindowAction = AppAction<TaskbarActionType.focusWindow, {window: IWindow}>;
type MoveWindowAction = AppAction<TaskbarActionType.moveWindow, {window: IWindow, rectangle: IRectangle}>;
type ClickTaskbarItemAction = AppAction<TaskbarActionType.clickTaskbarItem, {taskbarItem: TaskbarItem}>;
type ShowTaskbarWindowsPanelAction = AppAction<TaskbarActionType.showTaskbarWindowsPanel, {taskbarItem: TaskbarItem | null}>;
type ShowTaskbarContextMenuAction = AppAction<TaskbarActionType.showTaskbarContextMenu, {taskbarItem: TaskbarItem | null}>;
type PinTaskbarItemAction = AppAction<TaskbarActionType.pinTaskbarItem, {taskbarItem: TaskbarItem, isPinned: boolean}>;
type ClosePopupsAction = AppAction<TaskbarActionType.closePopups, null>;
type CloseTaskbarItemAction = AppAction<TaskbarActionType.closeTaskbarItem, {taskbarItem: TaskbarItem}>;

type TaskbarAction =
    OpenNewWindowAction |
    CloseWindowAction |
    MaximizeWindowAction |
    MinimizeWindowAction |
    FocusWindowAction |
    MoveWindowAction |
    ClickTaskbarItemAction |
    ShowTaskbarWindowsPanelAction |
    ShowTaskbarContextMenuAction |
    PinTaskbarItemAction |
    ClosePopupsAction |
    CloseTaskbarItemAction;

export default TaskbarAction;
