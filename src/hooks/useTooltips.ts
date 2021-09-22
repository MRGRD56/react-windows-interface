import {useMemo, useRef, useState} from "react";
import useRefMemo from "./useRefMemo";

export interface Tooltips {
    isTooltipsMode: boolean;
    startTooltipsTimer: () => void;
    abortTooltipsTimer: () => void;
    disableTooltipsMode: () => void;
}

export default function useTooltips(tooltipsModeTimeout = 500): Tooltips {
    const [isTooltipsMode, setIsTooltipsMode] = useState(false);
    const tooltipsTimer = useRef<NodeJS.Timeout>();
    const startTooltipsTimer = () => {
        if (tooltipsTimer.current || isTooltipsMode) return;
        tooltipsTimer.current = setTimeout(() => {
            setIsTooltipsMode(true);
            console.log("isTooltipsMode", isTooltipsMode);
        }, tooltipsModeTimeout);
    };
    const abortTooltipsTimer = () => {
        if (tooltipsTimer.current) {
            clearTimeout(tooltipsTimer.current);
            tooltipsTimer.current = undefined;
            console.log("isTooltipsMode", isTooltipsMode);
        }
    };
    const disableTooltipsMode = () => {
        setIsTooltipsMode(false);
    };
    const tooltips = useRefMemo({
        isTooltipsMode,
        startTooltipsTimer,
        abortTooltipsTimer,
        disableTooltipsMode
    });

    return tooltips;
}