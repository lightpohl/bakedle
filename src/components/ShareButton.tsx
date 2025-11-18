import toast from "react-hot-toast";

import { useDateString } from "../utils/date";
import { Game } from "../utils/game";
import { getSolutionDirection, Guess, MAX_GUESSES } from "../utils/guess";

import classes from "./ShareButton.module.css";

interface ShareButtonProps {
  game: Game;
  guesses: Guess[];
}

export const ShareButton = ({ game, guesses }: ShareButtonProps) => {
  const dateString = useDateString();

  return (
    <div className={classes.shareButtonWrapper}>
      <button
        type="button"
        onClick={async () => {
          let output = `BAKEDLE ${dateString}`;
          const correctIndex = guesses.findIndex(
            (guess) => guess.state === "CORRECT",
          );

          if (correctIndex !== -1) {
            output += ` ${correctIndex + 1}/${MAX_GUESSES} `;
          } else {
            output += `X/${MAX_GUESSES} `;
          }

          for (const guess of guesses) {
            if (guess.state === "CORRECT") {
              output += "✅";
              break;
            } else if (guess.state === "INCORRECT") {
              output += getSolutionDirection(guess.guess, game.solution);
            }
          }

          if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              window.navigator.userAgent,
            )
          ) {
            try {
              await window.navigator.share({
                title: "BAKEDLE",
                text: output,
                url: "https://bakedle.com",
              });
            } catch (error) {
              console.error(error);
            }
          } else {
            output += " https://bakedle.com";
            try {
              await navigator.clipboard.writeText(output);
              toast.success("Results copied to clipboard.");
            } catch (error) {
              console.error(error);
            }
          }
        }}
      >
        Share
      </button>
    </div>
  );
};
