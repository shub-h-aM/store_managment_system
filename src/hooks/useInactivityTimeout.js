import { useEffect, useRef, useCallback } from 'react';

const useInactivityTimeout = (timeout = 5 * 60 * 1000, onTimeout) => {
    const timeoutRef = useRef(null);

    const resetTimeout = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(onTimeout, timeout);
    }, [timeout, onTimeout]);

    useEffect(() => {
        resetTimeout();

        const handleActivity = () => {
            resetTimeout();
        };

        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);

        return () => {
            clearTimeout(timeoutRef.current);
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
        };
    }, [resetTimeout]);

    return null;
};

export default useInactivityTimeout;
