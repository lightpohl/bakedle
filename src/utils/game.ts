import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useDateString } from "./date";

const START_DATE = new Date("07/29/2024");
const GAME_COUNT = 58;

export interface Game {
  description: string;
  prompt: string;
  image: string;
  solution: number[];
  source?: string;
  success?: string;
}

interface RawGame {
  description: string;
  prompt: string;
  image: string;
  solution: string[];
  source?: string;
  success?: string;
}

export const parseRawGame = (rawGame: RawGame): Game => {
  const solution: number[] = [];
  rawGame.solution.forEach((entry) => {
    try {
      const entryNum = parseInt(entry);
      solution.push(entryNum);
    } catch (e) {
      console.error(e);
    }
  });

  return {
    ...rawGame,
    solution,
  };
};

export const getGame = async (name: string) => {
  const url = `/games/${name.replace(/\//g, "-")}.json`;

  const res = await fetch(url);
  return res.json() as Promise<RawGame>;
};

export const useDailyGame = () => {
  const dateString = useDateString();
  const today = new Date(dateString);

  const timeDifference = today.getTime() - START_DATE.getTime();
  const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  const gameNumber = `${dayDifference % GAME_COUNT}`.padStart(3, "0");

  const { data, error, isLoading } = useQuery({
    queryKey: ["game", dateString],
    queryFn: () => getGame(gameNumber),
    refetchOnWindowFocus: false,
  });

  const game = useMemo(() => {
    return data ? parseRawGame(data) : null;
  }, [data]);

  const hasNoGame = !isLoading && !game;

  useEffect(() => {
    if (error || hasNoGame) {
      toast.error("Unable to load today's game");
    }
  }, [error, hasNoGame]);

  return {
    game,
    error,
    isLoading,
  };
};
