import React from "react";
import IRectangle from "../2d/IRectangle";

export default interface IWindow {
    readonly id: number;
    title: string;
    iconSrc?: string;
    rectangle: IRectangle;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;

    content?: React.ReactNode
}
