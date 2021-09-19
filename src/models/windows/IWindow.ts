import React from "react";
import IRectangle from "../2d/IRectangle";
import Program from "./Program";
import ISize from "../2d/ISize";

export default interface IWindow {
    readonly id: number;
    readonly program: Program;
    title: string;
    iconSrc?: string;
    rectangle: IRectangle;
    isMinimized: boolean;
    isMaximized: boolean;
    minSize?: ISize;
    zIndex: number;

    content?: React.ReactNode
}
