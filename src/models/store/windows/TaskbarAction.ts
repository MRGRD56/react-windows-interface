import AppAction from "../AppAction";
import TaskbarActionType from "./TaskbarActionType";
import IWindow from "../../windows/IWindow";
import File from "../../windows/File";
import IRectangle from "../../2d/IRectangle";

type OpenNewWindowAction = AppAction<TaskbarActionType.openFile, {file: File}>;
type CloseWindowAction = AppAction<TaskbarActionType.closeWindow, {window: IWindow}>;
type MaximizeWindowAction = AppAction<TaskbarActionType.maximizeWindow, {window: IWindow, isMaximized: boolean}>;
type MinimizeWindowAction = AppAction<TaskbarActionType.minimizeWindow, {window: IWindow, isMinimized: boolean}>;
type FocusWindowAction = AppAction<TaskbarActionType.focusWindow, {window: IWindow}>;
type MoveWindowAction = AppAction<TaskbarActionType.moveWindow, {window: IWindow, rectangle: IRectangle}>;

type TaskbarAction =
    OpenNewWindowAction |
    CloseWindowAction |
    MaximizeWindowAction |
    MinimizeWindowAction |
    FocusWindowAction |
    MoveWindowAction;

export default TaskbarAction;
