import { useEffect, useState } from 'react';
export default function useDebounce(value: any, delay: number) {
    //value: any, because the hook used in many places and can take any value
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    return debouncedValue;
}
