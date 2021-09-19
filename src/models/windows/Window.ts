import IWindow from "./IWindow";
import {ReactNode} from "react";
import IRectangle from "../2d/IRectangle";
import Rectangle from "../2d/Rectangle";
import Program from "./Program";
import ISize from "../2d/ISize";

export default class Window implements IWindow {
    private static lastId = 0;
    static lastZIndex = 0;

    readonly id: number;
    isMaximized = false;
    isMinimized = false;
    zIndex: number;

    constructor(
        public title: string,
        public readonly program: Program,
        public content?: ReactNode,
        public rectangle: IRectangle = Rectangle.defaultWindowRectangle,
        public minSize?: ISize,
        public iconSrc?: string,
        id?: number
    ) {
        this.id = id ?? ++Window.lastId;
        this.zIndex = ++Window.lastZIndex;
    }
}
