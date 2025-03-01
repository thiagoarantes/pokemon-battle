import { useCallback } from "react";
import { Pokemon } from "./types";
import { usePokemon } from "./usePokemon";
import { POSITIONS } from "../types";

export function useBattle(): () => Promise<{ p1: Pokemon; p2: Pokemon }> {
  const getPokemon = usePokemon();

  return useCallback(
    async () => ({
      p1: await getPokemon(POSITIONS.P1),
      p2: await getPokemon(POSITIONS.P2),
    }),
    [getPokemon]
  );
}
