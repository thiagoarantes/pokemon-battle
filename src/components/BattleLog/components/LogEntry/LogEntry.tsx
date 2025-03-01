import { Log } from "../../../../types";
import styles from "./LogEntry.module.scss";

function LogEntry(props: Readonly<Log>) {
  const { timestamp, action } = props;

  return (
    <div className={styles.log}>
      <div className={styles.title}>[{timestamp}]</div>
      <div className={styles.action}>{action}</div>
    </div>
  );
}

export default LogEntry;
