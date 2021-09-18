import TaskbarItem from "../../windows/TaskbarItem";
import {List} from "immutable";

export default interface Taskbar {
    items: List<TaskbarItem>;
}
