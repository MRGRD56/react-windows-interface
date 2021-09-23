import {useRef, useState} from "react";
import useRefMemo from "./useRefMemo";

export interface Tooltips {
    isTooltipsMode: boolean;
    startTooltipsTimer: (callback?: () => void) => void;
    abortTooltipsTimer: () => void;
    startTooltipsDisabling: () => void;
    abortTooltipsDisabling: () => void;
}

export default function useTooltips(onTooltipsModeChanged: (isTooltipsMode: boolean) => void, tooltipsModeTimeout = 500): Tooltips {
    const [isTooltipsMode, setIsTooltipsMode] = useState(false);
    const tooltipsTimer = useRef<NodeJS.Timeout>();
    const tooltipsDisablingTimer = useRef<NodeJS.Timeout>();
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
    const startTooltipsDisabling = () => {
        if (tooltipsDisablingTimer.current || !isTooltipsMode) return;
        tooltipsDisablingTimer.current = setTimeout(() => {
            abortTooltipsTimer();
            setIsTooltipsMode(false);
            onTooltipsModeChanged(false);
        }, tooltipsModeTimeout);
    };
    const abortTooltipsDisabling = () => {
        if (tooltipsDisablingTimer.current) {
            clearTimeout(tooltipsDisablingTimer.current);
            tooltipsDisablingTimer.current = undefined;
        }
    };
    return {
        isTooltipsMode,
        startTooltipsTimer,
        abortTooltipsTimer,
        startTooltipsDisabling,
        abortTooltipsDisabling
    };
}