import {useRef, useState} from "react";
import useRefMemo from "./useRefMemo";

export interface Tooltips {
    isTooltipsMode: boolean;
    startTooltipsTimer: (callback?: () => void) => void;
    abortTooltipsTimer: () => void;
    disableTooltipsMode: () => void;
}

export default function useTooltips(onTooltipsModeChanged: (isTooltipsMode: boolean) => void, tooltipsModeTimeout = 500): Tooltips {
    const [isTooltipsMode, setIsTooltipsMode] = useState(false);
    const tooltipsTimer = useRef<NodeJS.Timeout>();
    const startTooltipsTimer = (callback?: () => void) => {
        if (tooltipsTimer.current || isTooltipsMode) return;
        tooltipsTimer.current = setTimeout(() => {
            setIsTooltipsMode(true);
            onTooltipsModeChanged(true);
            callback?.();
        }, tooltipsModeTimeout);
    };
    const abortTooltipsTimer = () => {
        if (tooltipsTimer.current) {
            clearTimeout(tooltipsTimer.current);
            tooltipsTimer.current = undefined;
        }
    };
    const disableTooltipsMode = () => {
        setIsTooltipsMode(false);
        onTooltipsModeChanged(false);
    };
    return {
        isTooltipsMode,
        startTooltipsTimer,
        abortTooltipsTimer,
        disableTooltipsMode
    };
}