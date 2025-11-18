import { useDateString } from "../utils/date";
import { Game } from "../utils/game";
import { Guess } from "../utils/guess";
import { useRandomItem } from "../utils/random";
import classes from "./GameDisplay.module.css";
import { GuessLine } from "./GuessLine";

const SUCCESS_MESSAGES = [
  "You nailed it. Congratulations! 🎆",
  "You've cracked today's bake. 🧠",
  "You're on fire! 🔥",
  "Wow, you really know your stuff! 🌟",
  "Bake master in action! 🎓",
  "You've hit the bullseye with this one! 🎯",
  "Bravo! Your bake skills are top-notch. 👏",
  "You've outsmarted the bake once more! 🦉",
  "You're on a roll. 🎳",
];

const FAILURE_MESSAGES = [
  "Sorry, better luck next time. 😭",
  "Close, but not quite. Keep at it! 🔄",
  "Oops! This one was tricky. Try again tomorrow. 🤔",
  "Not your day? Don't worry, there's always tomorrow. 🌅",
  "Almost had it! You'll get 'em next time. 👊",
  "Stumped for now, but you'll bounce back. 🦘",
  "This bake put up a fight. You'll conquer the next one. 🥊",
  "Even champion bakers have off days. Keep your chin up. 🙌",
  "Missed by a whisker! Tomorrow's another chance. 🐱",
  "Tough luck today. Your next win is just around the corner. 🍀",
  "Bake: 1, You: 0. But the game's not over! 🎲",
];

interface GameDisplayProps {
  game: Game;
  guesses: Guess[];
  hasSolved: boolean;
  hasFailed: boolean;
}

export const GameDisplay = ({
  game,
  guesses,
  hasSolved,
  hasFailed,
}: GameDisplayProps) => {
  const dateString = useDateString();
  const successMessage = useRandomItem(SUCCESS_MESSAGES);
  const failureMessager = useRandomItem(FAILURE_MESSAGES);

  const isGameOver = hasSolved || hasFailed;
  const answer =
    game.solution[0] === game.solution[1]
      ? game.solution[0]
      : `${game.solution[0]}–${game.solution[1]}`;

  return (
    <div className={classes.gameDisplay}>
      <img src={game.image} alt={classes.description} />
      <p className={classes.date}>{dateString}</p>
      <p className={classes.description}>{game.description}</p>
      <p className={classes.prompt}>{game.prompt}</p>
      {isGameOver ? (
        <>
          <p className={classes.answer}>{answer} mins</p>
          <p className={classes.endMessage}>
            {hasSolved ? game.success || successMessage : failureMessager}
          </p>
          {game.source ? (
            <a
              className={classes.source}
              href={game.source}
              rel="noreferrer"
              target="_blank"
            >
              Source
            </a>
          ) : null}
        </>
      ) : null}
      <div className={classes.guessesContainer}>
        <GuessLine game={game} guess={guesses[0]} />
        <GuessLine game={game} guess={guesses[1]} />
        <GuessLine game={game} guess={guesses[2]} />
        <GuessLine game={game} guess={guesses[3]} />
        <GuessLine game={game} guess={guesses[4]} />
      </div>
    </div>
  );
};
