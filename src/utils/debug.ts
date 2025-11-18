import { useMemo } from "react";

export const useDebugDate = () => {
  const debugDate = useMemo(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("debugDate");
  }, []);

  return debugDate;
};
