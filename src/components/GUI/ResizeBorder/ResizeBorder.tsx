import {DraggableCore, DraggableEventHandler} from "react-draggable";

interface Props {
    onDrag?: DraggableEventHandler,
    onDragStart?: DraggableEventHandler,
    onDragStop?: DraggableEventHandler,
    children?: any,
    className: string
}

function ResizeBorder({onDrag, onDragStart, onDragStop, children, className, ...props}: Props) {
    return (
        <DraggableCore onDrag={onDrag} onStart={onDragStart} onStop={onDragStop}>
            <div {...props} className={className}>
                {children}
            </div>
        </DraggableCore>
    );
}

export default ResizeBorder;
