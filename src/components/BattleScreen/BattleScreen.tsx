import { BattleScreenProps } from "./types";
import styles from "./BattleScreen.module.scss";
import classNames from "classnames";
import { POSITIONS } from "../../types";

function BattleScreen(props: BattleScreenProps) {
  const { battle, isLoadingBattle, loser } = props;

  return isLoadingBattle || !battle ? (
    <div className={styles.loading}>Loading...</div>
  ) : (
    <div className={styles.container}>
      <div className={styles.p1}>
        <div className={styles.dialog}>
          <span className={styles.types}>
            {battle.p1.types.map((type) => (
              <img key={type} src={type} alt={type} className={styles.type} />
            ))}
          </span>
          <span
            className={classNames(styles.name, {
              [styles.shiny]: battle.p1.shiny,
            })}
          >
            {battle.p1.name}
          </span>
          <span className={styles.attack}>
            {battle.p1.attack.name} ({battle.p1.attack.damage})
          </span>
        </div>
        <div
          className={classNames(styles.sprite, {
            [styles.loser]: loser === POSITIONS.P1,
          })}
        >
          <img src={battle.p1.image} alt={battle.p1.name} />
        </div>
      </div>
      <div className={styles.p2}>
        <div
          className={classNames(styles.sprite, {
            [styles.loser]: loser === POSITIONS.P2,
          })}
        >
          <img src={battle.p2.image} alt={battle.p2.name} />
        </div>
        <div className={styles.dialog}>
          <span className={styles.types}>
            {battle.p2.types.map((type) => (
              <img key={type} src={type} alt={type} className={styles.type} />
            ))}
          </span>
          <span
            className={classNames(styles.name, {
              [styles.shiny]: battle.p2.shiny,
            })}
          >
            {battle.p2.name}
          </span>
          <span className={styles.attack}>
            {battle.p2.attack.name} ({battle.p2.attack.damage})
          </span>
        </div>
      </div>
    </div>
  );
}

export default BattleScreen;
