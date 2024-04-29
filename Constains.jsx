import { useEffect, useRef } from "react";

export const ApiUrl = "http://localhost:8080"
// export const ApiUrl = "https://8bf7-176-213-88-7.ngrok-free.app"



export function useDebouncedFunction(func, delay, cleanUp = false) {
    const timeoutRef = useRef();
    const resultRef = useRef();
    const resolveRef = useRef();

    function clearTimer() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = undefined;
        }
    }

    useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp]);

    return (...args) => {
        clearTimer();
        return new Promise((resolve, reject) => {
            resolveRef.current = resolve;
            timeoutRef.current = setTimeout(async () => {
                try {
                    const result = await func(...args);
                    resolve(result);
                    resultRef.current = result;
                } catch (error) {
                    reject(error);
                }
            }, delay);
        });
    };
}
