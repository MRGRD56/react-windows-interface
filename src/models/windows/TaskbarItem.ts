import IWindow from "./IWindow";
import ShortcutFile from "./ShortcutFile";

export default interface TaskbarItem {
    file: ShortcutFile;
    windows: IWindow[];
    isPinned: boolean;
}
