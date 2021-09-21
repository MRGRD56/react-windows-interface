import IWindow from "./IWindow";
import {List} from "immutable";
import File from "./File";

export default interface TaskbarItem {
    file: File;
    windows: List<IWindow>;
    isPinned: boolean;
    isWindowsPanelShown?: boolean;
    isContextMenuShown?: boolean;
}
