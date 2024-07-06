import { useEffect, useRef } from 'react';

const useInactivityTimeout = (timeout = 5 * 60 * 1000, onTimeout) => {
    const timeoutRef = useRef(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(onTimeout, timeout);
    };

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
    }, [timeout, onTimeout]);

    return null;
};

export default useInactivityTimeout;
