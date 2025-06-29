import { useEffect, useRef } from "react";

const useDebounce = (callback, deps, delay = 300) => {
  const controllerRef = useRef(null);

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    const handler = setTimeout(() => {
      callback(signal);
    }, delay);

    return () => {
      clearTimeout(handler);
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [...deps, delay]);
};

export default useDebounce;
