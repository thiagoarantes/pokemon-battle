export interface Attack {
  name: string;
  damage: number;
}

export interface Pokemon {
  name: string;
  number: number;
  image: string;
  attack: Attack;
}

export interface Battle {
  p1: Pokemon;
  p2: Pokemon;
}
