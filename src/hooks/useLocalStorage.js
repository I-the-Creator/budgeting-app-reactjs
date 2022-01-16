import { useState, useEffect } from 'react';

// interaction with LOCAL STORAGE - takes care of getting the value from LS
function useLocalStorage(key, defaultValue) {
    // if there is a value(by key) in local storage - return this parsed value and set it to default 'value' state
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key)
        if(jsonValue != null) return JSON.parse(jsonValue)

        /*if there is a no value in LS, we return defaultValue, but check it before whether the defaultValue is a function,
        just as a precaution
        as inside of useState we can pass it a function */
        if (typeof defaultValue === 'function') {
            return defaultValue();
        } else return defaultValue;
    })

    // update the LS whenever of the values of 'key' and 'value' change
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    // return the result of function
    return [value, setValue]
}

export default useLocalStorage;