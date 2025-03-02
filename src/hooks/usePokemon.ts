import {
  formatPokemonLabel,
  getIsShiny,
  getPokemonImage,
  getPokemonNumber,
} from "../utils";
import { Position } from "../types";
import { Pokemon, Type } from "./types";
import { useCallback } from "react";

export function usePokemon(): (position: Position) => Promise<Pokemon> {
  return useCallback(async (position) => {
    /** Get Pokemon Data */
    const isShiny = getIsShiny();
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

    /** Get Types data */
    const types: Type[] = pokemonData.types;
    const typesResponse = await Promise.all(
      types.map((type) => fetch(type.type.url))
    );
    const typesData = await Promise.all(
      typesResponse.map((type) => type.json())
    );
    const typesUrls = typesData.map(
      (type) => type.sprites["generation-iii"].emerald.name_icon
    );

    return {
      name: (isShiny ? "Shiny " : "") + formatPokemonLabel(pokemonData.name),
      types: typesUrls,
      image: pokemonData.sprites[getPokemonImage(position, isShiny)],
      attack: {
        name: formatPokemonLabel(pokemonData.moves[randomMoveIndex].move.name),
        damage: moveData.power ?? 0,
      },
      shiny: isShiny,
    };
  }, []);
}
