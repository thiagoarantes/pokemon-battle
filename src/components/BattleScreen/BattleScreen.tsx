import { BattleScreenProps } from "./types";
import styles from "./BattleScreen.module.scss";

function BattleScreen(props: BattleScreenProps) {
  const { battle, isLoadingBattle } = props;

  return isLoadingBattle || !battle ? (
    <div className={styles.loading}>Loading...</div>
  ) : (
    <div className={styles.container}>
      <div className={styles.p1}>
        <div className={styles.dialog}>
          <span>{battle.p1.name}</span>
          <span>
            {battle.p1.attack.name} ({battle.p1.attack.damage})
          </span>
        </div>
        <div className={styles.sprite}>
          <img src={battle.p1.image} alt={battle.p1.name} />
        </div>
      </div>
      <div className={styles.p2}>
        <div className={styles.sprite}>
          <img src={battle.p2.image} alt={battle.p2.name} />
        </div>
        <div className={styles.dialog}>
          <span>{battle.p2.name}</span>
          <span>
            {battle.p2.attack.name} ({battle.p2.attack.damage})
          </span>
        </div>
      </div>
    </div>
  );
}

export default BattleScreen;
