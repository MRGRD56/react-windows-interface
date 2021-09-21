import React, {FC, HTMLProps, MouseEventHandler, useMemo} from "react";
import bg from "../../../assets/img/wallpapers/img19.jpg";
import "./DesktopEnvironment.scss";
import useAppSelector from "../../../hooks/useAppSelector";
import TaskbarComponent from "../TaskbarComponent/TaskbarComponent";
import WindowComponent from "../WindowComponent/WindowComponent";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import useActions from "../../../hooks/useActions";

const DesktopEnvironment: FC<HTMLProps<HTMLDivElement>> =
    ({children, className, style, ...props}) => {
        const taskbar = useAppSelector(state => state.taskbar);
        const windows = useAppSelector(state => state.taskbar.getWindows());
        const focusedWindow = useMemo(() => taskbar.getFocusedWindow(), [taskbar.items])
        const {closePopups} = useActions();

        const onMouseDown: MouseEventHandler<HTMLDivElement> = e => {
            closePopups();
        };

        return (
            <div className={["de", className].join(" ").trim()}
                style={{backgroundImage: `url(${bg})`, ...style}} {...props}
                onMouseDown={onMouseDown}>
                <div className="windows-wrapper">
                    <TransitionGroup>
                        {windows.map(w => (
                            <CSSTransition key={w.id} classNames="window-transition" timeout={50}>
                                <CSSTransition classNames="window-maximizing" timeout={50} in={w.isMaximized}>
                                    <CSSTransition classNames="window-minimizing" timeout={400} in={w.isMinimized}>
                                        <WindowComponent window={w} focusedWindow={focusedWindow}/>
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
