import {MouseEventHandler, ReactNode} from "react";
import "./WindowTitleButton.scss";

interface Props {
    children?: ReactNode,
    isCloseButton?: boolean,
    onClick?: MouseEventHandler
}

function WindowTitleButton({children, isCloseButton, onClick, ...props}: Props) {
    return (
        <button className={"window-title-btn unselectable" + (isCloseButton ? " win-close-btn" : "")} onClick={onClick} {...props}>
            {children}
        </button>
    );
}

export default WindowTitleButton;
