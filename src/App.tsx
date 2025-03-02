import { useCallback, useEffect, useState, useTransition } from "react";
import { BattleLog, BattleScreen } from "./components";
import { Battle, useBattle } from "./hooks";
import { getCurrentDate } from "./utils";
import { Log, Position, POSITIONS } from "./types";
import styles from "./App.module.scss";

function App() {
  const [battle, setBattle] = useState<Battle>();
  const [loser, setLoser] = useState<Position | null>();
  const [logs, setLogs] = useState<Log[]>([]);

  const [isLoadingBattle, startTransition] = useTransition();

  const getNewBattle = useBattle();

  const addLogEntry = (entry: string) => {
    setLogs((prevLogs) => [
      {
        timestamp: getCurrentDate(),
        action: entry,
      },
      ...prevLogs,
    ]);
  };

  const startNewBattle = useCallback(() => {
    setLoser(undefined);

    startTransition(async () => {
      const newBattle = await getNewBattle();

      setBattle(newBattle);
      addLogEntry(
        `New Battle Started! - ${newBattle.p1.name} vs ${newBattle.p2.name}`
      );
    });
  }, [getNewBattle]);

  const resolveBattle = useCallback(() => {
    if (!battle) {
      return;
    }

    if (battle.p1.attack.damage === battle.p2.attack.damage) {
      addLogEntry(`${battle.p1.name} vs ${battle.p2.name} results in a tie!`);
      setLoser(null);

      return;
    }

    if (battle.p1.attack.damage > battle.p2.attack.damage) {
      addLogEntry(
        `${battle.p1.name} lands a decisive blow with ${battle.p1.attack.name} knocking out ${battle.p2.name}!`
      );
      setLoser(POSITIONS.P2);

      return;
    }

    addLogEntry(
      `${battle.p2.name} lands a decisive blow with ${battle.p2.attack.name} knocking out ${battle.p1.name}!`
    );
    setLoser(POSITIONS.P1);
  }, [battle]);

  useEffect(() => {
    startNewBattle();
  }, [startNewBattle]);

  return (
    <div className={styles.console}>
      <div className={styles.screen}>
        <BattleScreen
          battle={battle}
          isLoadingBattle={isLoadingBattle}
          loser={loser}
        />
      </div>
      <div className={styles.controls}>
        <div className={styles.log}>
          <BattleLog logs={logs} />
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={resolveBattle}
            disabled={loser !== undefined}
          >
            Start Battle!
          </button>
          <button className={styles.button} onClick={startNewBattle}>
            New Battle
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
