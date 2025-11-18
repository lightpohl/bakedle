import { useState } from "react";
import { Toaster } from "react-hot-toast";

import { DailyGame } from "./components/DailyGame";
import { HelpDialog } from "./components/HelpDialog";
import { Spinner } from "./components/Spinner";
import { useDailyGame } from "./utils/game";
import { useStats } from "./utils/user";

import classes from "./App.module.css";
import { StatsDialog } from "./components/StatsDialog";

function App() {
  const [showHelp, setShowHelp] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const { stats, updateStats } = useStats();
  const { game } = useDailyGame();

  const disableKeyboard = showHelp || showStats;

  return (
    <>
      <header className={classes.header}>
        <nav className={classes.nav}>
          <ul>
            <li>
              <a href="/">
                <span className="bake-text">Bake</span>dle
              </a>
            </li>
            <li>
              <button
                type="button"
                aria-label="Open help"
                onClick={() => setShowHelp(true)}
              >
                ❓
              </button>
            </li>
            <li>
              <button
                type="button"
                aria-label="Open stats"
                onClick={() => setShowStats(true)}
              >
                📊
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main className={classes.main}>
        <h1 className="sr-only">BAKEDLE</h1>
        {game ? (
          <DailyGame
            activeGame={game}
            disableKeyboard={disableKeyboard}
            onGameOver={(save, hasWon) => {
              const newStats = { ...stats };

              if (hasWon) {
                newStats.wins += 1;
                newStats.streak += 1;

                const correctGuessIndex = save.guesses.findIndex(
                  (guess) => guess.state === "CORRECT"
                );

                if (correctGuessIndex > -1) {
                  const key = correctGuessIndex + 1;
                  newStats.distribution = {
                    ...newStats.distribution,
                    [key]: (newStats.distribution?.[key] ?? 0) + 1,
                  };
                }

                if (newStats.streak > newStats.maxStreak) {
                  newStats.maxStreak = newStats.streak;
                }
              }

              newStats.played += 1;

              updateStats(newStats);
            }}
          />
        ) : (
          <Spinner />
        )}
      </main>
      <footer className={classes.footer}>
        These soggy bottoms made by{" "}
        <a href="https://lightpohl.me">@lightpohl</a>
      </footer>
      <HelpDialog show={showHelp} onClose={() => setShowHelp(false)} />
      <StatsDialog
        show={showStats}
        onClose={() => setShowStats(false)}
        stats={stats}
      />
      <Toaster />
    </>
  );
}

export default App;
