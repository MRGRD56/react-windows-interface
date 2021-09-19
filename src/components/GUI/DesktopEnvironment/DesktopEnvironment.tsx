import React, {FC, HTMLProps} from "react";
import bg from "../../../assets/img/wallpapers/img19.jpg";
import "./DesktopEnvironment.scss";
import useAppSelector from "../../../hooks/useAppSelector";
import TaskbarComponent from "../TaskbarComponent/TaskbarComponent";
import WindowComponent from "../WindowComponent/WindowComponent";

const DesktopEnvironment: FC<HTMLProps<HTMLDivElement>> =
    ({children, className, style, ...props}) => {
        const taskbar = useAppSelector(state => state.taskbar);
        const windows = useAppSelector(state => state.taskbar.getWindows());

        return (
            <div className={["de", className].join(" ").trim()}
                style={{backgroundImage: `url(${bg})`, ...style}} {...props}>
                {windows.map(w => (
                    <WindowComponent key={w.id} window={w}/>
                ))}
                <TaskbarComponent taskbar={taskbar}/>
            </div>
        );
    };

export default DesktopEnvironment;
