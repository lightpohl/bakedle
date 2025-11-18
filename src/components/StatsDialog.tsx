import { Stats } from "../utils/user";
import { Dialog } from "./Dialog";

import classes from "./StatsDialog.module.css";

interface StatsDialogProps {
  onClose: () => void;
  show: boolean;
  stats: Stats;
}

export const StatsDialog = ({ onClose, show, stats }: StatsDialogProps) => {
  const setLength = Object.keys(stats.distribution).length;
  const totalGuesses = Object.keys(stats.distribution).reduce((acc, curr) => {
    const currAsNum = parseInt(curr);
    const amountToAdd = stats.distribution[currAsNum] * currAsNum;
    return acc + amountToAdd;
  }, 0);

  const averageGuess = setLength
    ? parseFloat((totalGuesses / setLength).toFixed(1))
    : "?";

  return (
    <Dialog title="Stats" show={show} onClose={onClose}>
      <>
        <div className={classes.statRow}>
          <div className={classes.statItem}>
            <div>Played</div>
            <div>{stats.played}</div>
          </div>
          <div className={classes.statItem}>
            <div>Wins</div>
            <div>{stats.wins}</div>
          </div>
          <div className={classes.statItem}>
            <div>Streak</div>
            <div>{stats.streak}</div>
          </div>
        </div>
        <div className={classes.statRow}>
          <div className={classes.statItem}>
            <div>Average Solve</div>
            <div>{averageGuess}</div>
          </div>
          <div className={classes.statItem}>
            <div>Max Streak</div>
            <div>{stats.maxStreak}</div>
          </div>
        </div>
      </>
    </Dialog>
  );
};
