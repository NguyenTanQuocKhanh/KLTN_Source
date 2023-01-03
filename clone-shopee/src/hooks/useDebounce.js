import { useEffect, useState } from 'react';

function useDebounce(value, delay) {
    //lần đầu value =''
    //lần 2 khi index search truyền value vào thì ở đây nó vẫn không được truyền vào useState()
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
        //
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    return debounceValue;
}

export default useDebounce;
