export type NamedAPIResource = {
  name: string;
  url: string;
};

export type PokemonListPage = {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
};

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other?: {
      ["official-artwork"]?: {
        front_default: string | null;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats?: {
    base_stat: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
};

export type TypeResponse = {
  pokemon: {
    pokemon: NamedAPIResource;
    slot?: number;
  }[];
};
