import { useMemo } from "react";
import { useDebugDate } from "./debug";

export const getDateString = () => {
  const today = new Date();
  const dd = `${today.getDate()}`.padStart(2, "0");
  const mm = `${today.getMonth() + 1}`.padStart(2, "0");
  const yyyy = `${today.getFullYear()}`;

  return `${mm}/${dd}/${yyyy}`;
};

export const useDateString = () => {
  const debugDate = useDebugDate();
  const dateString = useMemo(
    () => (debugDate ? debugDate : getDateString()),
    [debugDate]
  );

  return dateString;
};
