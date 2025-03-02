import { useCallback } from "react";
import { Battle } from "./types";
import { usePokemon } from "./usePokemon";
import { POSITIONS } from "../types";

export function useBattle(): () => Promise<Battle> {
  const getPokemon = usePokemon();

  return useCallback(async () => {
    const pokemon = await Promise.all([
      getPokemon(POSITIONS.P1),
      getPokemon(POSITIONS.P2),
    ]);

    return {
      p1: pokemon[0],
      p2: pokemon[1],
    };
  }, [getPokemon]);
}
