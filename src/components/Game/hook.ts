import { useEffect, useRef } from "react";

export function useCustomEffect(callbackOnFirstRender: Function, callbackOnAnotherRenders: Function) {
    const isFirst = useRef(true);

    useEffect(() => {
        if (isFirst.current) {
            isFirst.current = false;
            return callbackOnFirstRender();
        } else {
            return callbackOnAnotherRenders();
        }
    })
}