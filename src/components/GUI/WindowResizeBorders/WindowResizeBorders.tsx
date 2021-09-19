import React from "react";
import ResizeBorder from "../ResizeBorder/ResizeBorder";
import Side from "../../../models/2d/Side";
import "./WindowResizeBorders.scss";
import {DraggableEventHandler} from "react-draggable";

interface Props {
    onResize?: (e: any, side: Side) => void,
    onResizeStart?: DraggableEventHandler,
    onResizeStop?: DraggableEventHandler
}

const WindowResizeBorders = ({onResize, onResizeStart, onResizeStop}: Props) => {
    const resizeBorders = [
        {
            sideString: "t",
            side: Side.top
        },
        {
            sideString: "r",
            side: Side.right
        },
        {
            sideString: "b",
            side: Side.bottom
        },
        {
            sideString: "l",
            side: Side.left
        },
        {
            sideString: "tl",
            side: Side.top | Side.left
        },
        {
            sideString: "tr",
            side: Side.top | Side.right
        },
        {
            sideString: "bl",
            side: Side.bottom | Side.left
        },
        {
            sideString: "br",
            side: Side.bottom | Side.right
        }
    ];

    return (
        <div className="resize-borders-wrapper">
            {resizeBorders.map((rb, index) => (
                <ResizeBorder className={`resize-border resize-border-${rb.sideString}`}
                    key={index}
                    onDrag={e => onResize?.(e, rb.side)}
                    onDragStart={onResizeStart} onDragStop={onResizeStop}/>
            ))}
        </div>
    );
};

export default WindowResizeBorders;
