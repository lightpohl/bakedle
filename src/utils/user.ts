import { useCallback, useMemo, useState } from "react";
import { useDateString } from "./date";
import { Guess } from "./guess";

export interface Save {
  date: string;
  guesses: Guess[];
  done: boolean;
}

export const useSave = () => {
  const dateString = useDateString();
  const initSave = useMemo(() => {
    const item = window.localStorage.getItem("save");

    if (item) {
      const potentialSave = JSON.parse(item) as Save;

      if (potentialSave.date === dateString) {
        return potentialSave;
      }
    }

    return {
      date: dateString,
      guesses: [
        { guess: "", state: "ACTIVE" },
        { guess: "", state: "INACTIVE" },
        { guess: "", state: "INACTIVE" },
        { guess: "", state: "INACTIVE" },
        { guess: "", state: "INACTIVE" },
      ] as Guess[],
      done: false,
    };
  }, [dateString]);

  const [save, setSave] = useState<Save>(initSave);

  const updateSave = useCallback(
    (partialSave: Partial<Save>) => {
      const newSave = { ...save, ...partialSave };
      setSave(newSave);
      window.localStorage.setItem("save", JSON.stringify(newSave));

      return newSave;
    },
    [save],
  );

  return { save, updateSave };
};

export interface Stats {
  played: number;
  wins: number;
  streak: number;
  maxStreak: number;
  distribution: Record<number, number>;
}

export const useStats = () => {
  const initStats = useMemo(() => {
    const item = window.localStorage.getItem("stats");

    if (item) {
      return JSON.parse(item) as Stats;
    }

    return {
      played: 0,
      wins: 0,
      streak: 0,
      maxStreak: 0,
      distribution: {},
    };
  }, []);

  const [stats, setStats] = useState(initStats);

  const updateStats = useCallback(
    (partialStats: Partial<Stats>) => {
      const newStats = { ...stats, ...partialStats };
      setStats(newStats);
      window.localStorage.setItem("stats", JSON.stringify(newStats));

      return newStats;
    },
    [stats],
  );

  return { stats, updateStats };
};
