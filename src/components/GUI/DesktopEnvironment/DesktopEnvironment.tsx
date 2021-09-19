import React, {FC, HTMLProps} from "react";
import bg from "../../../assets/img/wallpapers/img19.jpg";
import "./DesktopEnvironment.scss";
import useAppSelector from "../../../hooks/useAppSelector";
import TaskbarComponent from "../TaskbarComponent/TaskbarComponent";
import WindowComponent from "../WindowComponent/WindowComponent";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const DesktopEnvironment: FC<HTMLProps<HTMLDivElement>> =
    ({children, className, style, ...props}) => {
        const taskbar = useAppSelector(state => state.taskbar);
        const windows = useAppSelector(state => state.taskbar.getWindows());

        return (
            <div className={["de", className].join(" ").trim()}
                style={{backgroundImage: `url(${bg})`, ...style}} {...props}>
                <div className="windows-wrapper">
                    <TransitionGroup>
                        {windows.map(w => (
                            <CSSTransition key={w.id} classNames="window-transition" timeout={50}>
                                <CSSTransition classNames="window-maximizing" timeout={50} in={w.isMaximized}>
                                    <CSSTransition classNames="window-minimizing" timeout={400} in={w.isMinimized}>
                                        <WindowComponent window={w}/>
                                    </CSSTransition>
                                </CSSTransition>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
                <TaskbarComponent taskbar={taskbar}/>
            </div>
        );
    };

export default DesktopEnvironment;
