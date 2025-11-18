import { useEffect, useState } from "react";
import { Game } from "../utils/game";
import { Guess } from "../utils/guess";
import { GameDisplay } from "./GameDisplay";
import { NumPad } from "./NumPad";
import { ShareButton } from "./ShareButton";

import classes from "./DailyGame.module.css";
import { Save, useSave } from "../utils/user";

const MAX_INPUT_LENGTH = 3;

interface DailyGameProps {
  activeGame: Game;
  onGameOver: (save: Save, hasWon: boolean) => void;
  disableKeyboard?: boolean;
}

export const DailyGame = ({
  activeGame,
  disableKeyboard,
  onGameOver,
}: DailyGameProps) => {
  const [enableKeyboard, setEnableKeyboard] = useState(true);
  const { save, updateSave } = useSave();

  const activeGuess = save.guesses.find((guess) => guess.state === "ACTIVE");

  const hasSolved = save.guesses.some((guess) => guess.state === "CORRECT");
  const hasFailed = save.guesses.every((guess) => guess.state === "INCORRECT");

  const isGameOver = hasSolved || hasFailed;

  useEffect(() => {
    if (!save.done && (hasSolved || hasFailed)) {
      onGameOver(updateSave({ done: true }), hasSolved);
    }
  }, [hasSolved, hasFailed, save.done, onGameOver, updateSave]);

  const getIsCorrectGuess = (guess: Guess): boolean => {
    let guessInt = 0;
    const [min, max] = activeGame.solution;

    try {
      guessInt = parseInt(guess.guess);
    } catch (error) {
      console.error(error);
    }

    return guessInt >= min && guessInt <= max;
  };

  const handleChange = (newValue: string) => {
    const newGuesses = save.guesses.map((guess) => {
      if (guess.state === "ACTIVE") {
        return {
          ...guess,
          guess: newValue.slice(0, MAX_INPUT_LENGTH),
        };
      }

      return guess;
    });

    updateSave({ guesses: newGuesses });
  };

  const onSubmit = () => {
    const newGuesses = [...save.guesses];
    for (let i = 0; i < newGuesses.length; i++) {
      const guess = newGuesses[i];

      if (guess.state === "ACTIVE") {
        const isCorrectGuess = getIsCorrectGuess(guess);
        newGuesses[i].state = isCorrectGuess ? "CORRECT" : "INCORRECT";

        if (!isCorrectGuess && newGuesses[i + 1]) {
          newGuesses[i + 1].state = "ACTIVE";
        }

        break;
      }
    }

    updateSave({ guesses: newGuesses });
  };

  return (
    <>
      <GameDisplay
        game={activeGame}
        guesses={save.guesses}
        hasSolved={hasSolved}
        hasFailed={hasFailed}
      />
      {activeGuess ? (
        <div className={classes.actionsWrapper}>
          <div className={classes.numPadWrapper}>
            <NumPad
              onChange={handleChange}
              onSubmit={() => {
                if (activeGuess?.guess) {
                  onSubmit();
                }
              }}
              value={activeGuess.guess}
              enableKeyboard={enableKeyboard && !disableKeyboard}
            />
            <input
              aria-label="Set bake time"
              type="number"
              className="sr-only"
              value={activeGuess.guess}
              tabIndex={-1}
              onChange={(e) => {
                handleChange(e.target.value);
              }}
              maxLength={MAX_INPUT_LENGTH}
              onFocus={() => setEnableKeyboard(false)}
              onBlur={() => setEnableKeyboard(true)}
            />
          </div>
          <div className={classes.bakeButtonWrapper}>
            <button
              disabled={!activeGuess?.guess}
              type="button"
              onClick={onSubmit}
            >
              Bake!
            </button>
          </div>
        </div>
      ) : null}
      {isGameOver ? (
        <ShareButton game={activeGame} guesses={save.guesses} />
      ) : null}
    </>
  );
};
