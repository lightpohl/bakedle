export type GuessState = "INACTIVE" | "ACTIVE" | "CORRECT" | "INCORRECT";

export const MAX_GUESSES = 5;

export interface Guess {
  guess: string;
  state: GuessState;
}

export const getSolutionDirection = (
  guess: string,
  solution: number[]
): string => {
  const [, max] = solution;

  try {
    const guessInt = parseInt(guess);

    if (guessInt > max) {
      return "⬇️";
    }

    return "⬆️";
  } catch (error) {
    console.error(error);
  }

  return "❓";
};

const NEAR_LIMIT = 10;
export const getIsNearSolution = (guess: string, solution: number[]) => {
  const [min, max] = solution;

  try {
    const guessInt = parseInt(guess);

    if (guessInt > max && guessInt < max + NEAR_LIMIT) {
      return true;
    }

    if (guessInt < min && guessInt > min - NEAR_LIMIT) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }

  return false;
};
