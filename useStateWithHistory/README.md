<b>useStateWithHistory</b>

Write a useStateWithHistory custom hook that takes in an initialState value.
Calling useStateWithHistory should work the same as useState , but with an added history with the ability to scroll through previous state
values.
The useStateWithHistory hook should return an array with five entries in this order:
    1. The current value.
    2. A setter function to update the value. This function should take in the new value as a parameter, just like the setter function returned by useState .
    3. A function to "go back" to the previous state value. Calling this function should update the state to the previous value, and it should cause a rerender just as setting the state to a new value would. If there is no previous state value, this function should have no effect.
    4. A function to "go forward" to the next state value. Calling this function should update the state to the next value in the history, and it should cause a re-render just as setting the state to a new value would. If there is no next value in the history, this function should have no effect.
    5. The history of values as an array, initially containing only the initial value. Every time the setter function is called, the new value should b appended to the end of the history array.

If the setter function is called after having gone backwards to a previous value, the value should be updated to the new value. The new value should be
appended to the end of the history array as if "go forwards" had been called until reaching the end of the history array before setting a new value (see sample usage below).

const {value, setValue, goBack, goForward, history} = useStateWithHistory(1);

setValue(2); // history =[1,2] value = 2
setValue(3); // history =[1,2,3] value = 3
setValue(4); // history =[1,2,3,4] value = 4
goBack(); // history =[1,2,3,4] value = 3
goBack(); // history =[1,2,3,4] value = 2
goBack(); // history =[1,2,3,4] value = 1
goBack(); // history =[1,2,3,4] value = 1
goForward(); // history =[1,2,3,4] value = 2
goForward(); // history =[1,2,3,4] value = 3
goForward(); // history =[1,2,3,4] value = 4
goForward(); // history =[1,2,3,4] value = 4



For simplicity, you can assume the initialState value and the value passed to the setter function will always be primitives.




import React, { useState, useRef } from "react";

function useStateWithHistory(initialState) {
  // Write your code here.
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
}

// Do not edit the line below.
exports.useStateWithHistory = useStateWithHistory;
