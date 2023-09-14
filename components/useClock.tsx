import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";

export default function useClock() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (time <= 0) return;

    const timeout = setTimeout(() => {
      setTime((time) => time - 1);
    }, 1000);

    return ()=>clearTimeout(timeout);
  }, [time]);

  function start(seconds:number){
    setTime(seconds);
  }
  return (
    {time, start}
  );
}
