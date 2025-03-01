import { formatPokemonLabel, getPokemonNumber } from "../utils";
import { Position, POSITIONS } from "../types";
import { Pokemon } from "./types";
import { useCallback } from "react";

export function usePokemon(): (position: Position) => Promise<Pokemon> {
  return useCallback(async (position) => {
    /** Get Pokemon Data */
    const pokemonId = getPokemonNumber();
    const pokemonResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );
    const pokemonData = await pokemonResponse.json();
    const movesCount = pokemonData.moves.length;
    const randomMoveIndex = Math.floor(Math.random() * movesCount);

    /** Get Moves Data */
    const moveResponse = await fetch(
      pokemonData.moves[randomMoveIndex].move.url
    );
    const moveData = await moveResponse.json();

    return {
      name: formatPokemonLabel(pokemonData.name),
      number: pokemonData.id,
      image:
        position === POSITIONS.P1
          ? pokemonData.sprites.front_default
          : pokemonData.sprites.back_default,
      attack: {
        name: formatPokemonLabel(pokemonData.moves[randomMoveIndex].move.name),
        damage: moveData.power ?? 0,
      },
    };
  }, []);
}
