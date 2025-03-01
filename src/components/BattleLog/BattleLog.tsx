import { nanoid } from "nanoid";
import styles from "./BattleLog.module.scss";
import { LogEntry } from "./components";
import { BattleLogProps } from "./types";

function BattleLog(props: Readonly<BattleLogProps>) {
  const { logs } = props;

  return (
    <div className={styles.container}>
      {logs.map((log) => (
        <LogEntry key={nanoid()} {...log} />
      ))}
    </div>
  );
}

export default BattleLog;
