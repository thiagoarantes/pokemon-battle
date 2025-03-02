import { Battle } from "../../hooks";
import { Position } from "../../types";

export interface BattleScreenProps {
  battle?: Battle;
  isLoadingBattle: boolean;
  loser?: Position | null;
}
