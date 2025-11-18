import { useMemo } from "react";

export const useRandomItem = <T>(items: T[]): T => {
  const itemsLength = items.length;
  const randomIndex = useMemo(() => {
    return Math.floor(Math.random() * itemsLength);
  }, [itemsLength]);

  return items[randomIndex];
};
