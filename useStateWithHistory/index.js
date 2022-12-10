import React, { useState, useRef } from "react";

export default useStateWithHistory = (initialState) => {
  const [value, setActualValue] = useState(initialState);
  const history = useRef([value]);
  const currentIndex = useRef(0);
  const setValue = (newValue) => {
    history.current.push(newValue);
    currentIndex.current = history.current.length - 1;
    setActualValue(newValue);
  };
  const goBack = () => {
    if (currentIndex.current > 0) {
      currentIndex.current--;
      setActualValue(history.current[currentIndex.current]);
    }
  };

  const goForward = () => {
    if (currentIndex.current < history.current.length - 1) {
      currentIndex.current++;
      setActualValue(history.current[currentIndex.current]);
    }
  };
  return [value, setValue, goBack, goForward, history.current];
};
