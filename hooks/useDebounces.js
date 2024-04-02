import React, { useEffect, useRef } from 'react'

export const useDebounces = (calback, delay) => {
    const timeoutRef = useRef(null);

    useEffect(()=>{
        return() => {
            if(timeoutRef.current){
                clearTimeout(timeoutRef.current)
            }
        }
    }, []);

    const debouncedCallBack = (...args) => {
        if(timeoutRef.current){
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
            calback(...args)
        }, delay)
    }
  return debouncedCallBack
}

