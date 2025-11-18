import { Game } from "../utils/game";
import { getIsNearSolution, getSolutionDirection, Guess } from "../utils/guess";

import classes from "./GuessLine.module.css";
import { Tooltip } from "./Tooltip";

interface GuessLineProps {
  game: Game;
  guess: Guess;
}

const getGuessClassNames = (guess: Guess): string => {
  let classNames = classes.guess;

  if (guess.state === "INACTIVE") {
    classNames += ` ${classes.empty}`;
  }

  if (guess.state === "ACTIVE") {
    classNames += ` ${classes.active}`;
  }

  if (guess.state === "CORRECT") {
    classNames += ` ${classes.correct}`;
  }

  if (guess.state === "INCORRECT") {
    classNames += ` ${classes.incorrect}`;
  }

  return classNames;
};

export const GuessLine = ({ game, guess }: GuessLineProps) => {
  const showIcons = guess.state === "INCORRECT";
  const direction = getSolutionDirection(guess.guess, game.solution);
  const isNearSolution = getIsNearSolution(guess.guess, game.solution);
  const isCorrect = guess.state === "CORRECT";

  let guessInt = 0;

  try {
    guessInt = parseInt(guess.guess);
  } catch (error) {
    console.error(error);
  }

  const minsText = guess.guess ? (guessInt === 1 ? "min" : "mins") : "";
  const directionIcon = isCorrect ? "✅" : showIcons ? direction : "";

  return (
    <div className={getGuessClassNames(guess)}>
      <div className={classes.text}>{`${guess.guess} ${minsText}`}</div>
      <div className={classes.icons}>
        {isNearSolution && showIcons ? (
          <div>
            <Tooltip text="Getting closer">🔴</Tooltip>
          </div>
        ) : null}
        <div>{directionIcon}</div>
      </div>
    </div>
  );
};
