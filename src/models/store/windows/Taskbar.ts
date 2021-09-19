import TaskbarItem from "../../windows/TaskbarItem";
import {List} from "immutable";

export default class Taskbar {
    items: List<TaskbarItem>;
    constructor(items: Iterable<TaskbarItem> | ArrayLike<TaskbarItem>) {
        this.items = List(items);
    }

    getWindows() {
        return this.items.flatMap(item => item.windows);
    }

    getFocusedWindow() {
        return this.getWindows().maxBy(w => w.zIndex);
    }
}
