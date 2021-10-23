import { useCallback, useRef } from 'react';

const useDebouncedFunction = (func, delayMs) => {
    const tid = useRef();

    const debouncedFunc = useCallback((...args) => {
        if (tid.current) {
            clearTimeout(tid.current);
        }

        tid.current = setTimeout(() => {
            func(...args);
            tid.current = null;
        }, delayMs);
    }, [func, delayMs]);

    return debouncedFunc;
}

export default useDebouncedFunction;