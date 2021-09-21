import TaskbarItem from "../../windows/TaskbarItem";
import {List} from "immutable";
import IWindow from "../../windows/IWindow";

export default class Taskbar {
    items: List<TaskbarItem>;
    constructor(items: Iterable<TaskbarItem> | ArrayLike<TaskbarItem>) {
        this.items = List(items);
    }

    getWindows(): List<IWindow> {
        return this.items.flatMap(item => item.windows);
    }

    getFocusedWindow(): IWindow | null {
        return this.getWindows()
            .filter(w => !w.isMinimized)
            .maxBy(w => w.zIndex) ?? null;
    }

    getActiveItem(): TaskbarItem | null {
        const activeItem = this.items
            .maxBy(item => item.windows
                .filter(w => !w.isMinimized)
                .maxBy(w => w.zIndex)?.zIndex ?? -1);
        if (!activeItem) return null;
        const hasOpenWindows = activeItem.windows.some(w => !w.isMinimized);
        return hasOpenWindows ? activeItem : null;
    }
}
