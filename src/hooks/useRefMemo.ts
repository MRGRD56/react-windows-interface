import {useMemo, useRef} from "react";

export default function useRefMemo<T>(value: T) {
    const ref = useRef<T>(value);
    const memo = useMemo(() => ref.current, [ref.current]);
    return memo;
}