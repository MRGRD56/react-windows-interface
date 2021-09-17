import IWindow from "./IWindow";
import Rectangle from "../2d/Rectangle";

export default class Window implements IWindow {
    private static lastId = 0;
    static lastZIndex = 0;

    readonly id: number;
    isMaximized = false;
    isMinimized = false;
    zIndex: number;

    constructor(
        public title: string,
        public rectangle: Rectangle,
        id?: number
    ) {
        this.id = id ?? ++Window.lastId;
        this.zIndex = ++Window.lastZIndex;
    }
}
