import IWindow from "./IWindow";
import {ReactNode} from "react";
import IRectangle from "../2d/IRectangle";

export default class Window implements IWindow {
    private static lastId = 0;
    static lastZIndex = 0;

    readonly id: number;
    isMaximized = false;
    isMinimized = false;
    zIndex: number;

    constructor(
        public title: string,
        public rectangle: IRectangle,
        public iconSrc?: string,
        public content?: ReactNode,
        id?: number
    ) {
        this.id = id ?? ++Window.lastId;
        this.zIndex = ++Window.lastZIndex;
    }
}
