import Rectangle from "../2d/Rectangle";
import React from "react";

export default interface IWindow {
    readonly id: number;
    title: string;
    iconSrc?: string;
    rectangle: Rectangle;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;

    content?: React.ReactNode
}
