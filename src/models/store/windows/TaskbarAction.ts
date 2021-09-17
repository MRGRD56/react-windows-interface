import AppAction from "../AppAction";
import TaskbarActionType from "./TaskbarActionType";
import IWindow from "../../windows/IWindow";

type OpenNewWindowAction = AppAction<TaskbarActionType.openNewWindow, {window: IWindow}>;
type CloseWindowAction = AppAction<TaskbarActionType.closeWindow, {window: IWindow}>;
type MaximizeWindowAction = AppAction<TaskbarActionType.maximizeWindow, {window: IWindow, isMaximized: boolean}>;
type MinimizeWindowAction = AppAction<TaskbarActionType.minimizeWindow, {window: IWindow, isMinimized: boolean}>;
type FocusWindowAction = AppAction<TaskbarActionType.focusWindow, {window: IWindow}>;

type TaskbarAction = OpenNewWindowAction | CloseWindowAction | MaximizeWindowAction | MinimizeWindowAction | FocusWindowAction;
export default TaskbarAction;
