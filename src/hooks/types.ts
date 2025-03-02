export interface Attack {
  name: string;
  damage: number;
}

export interface Pokemon {
  name: string;
  types: string[];
  image: string;
  attack: Attack;
  shiny: boolean;
}

export interface Battle {
  p1: Pokemon;
  p2: Pokemon;
}

export interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
