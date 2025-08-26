import { Pokemon, PokemonListPage, TypeResponse, PokemonSpecies, EvolutionChain } from "../types/pokeapi";

const API = "https://pokeapi.co/api/v2";
const cache = new Map<string, unknown>();

export function clearCache() {
  cache.clear();
}

type GetJsonOpts = { signal?: AbortSignal };

async function getJson<T>(path: string, opts: GetJsonOpts = {}): Promise<T> {
  const url = `${API}${path}`;
  if (cache.has(url)) return cache.get(url) as T;

  const res = await fetch(url, {
    signal: opts.signal,
    headers: { Accept: "application/json" },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);

  const data = (await res.json()) as T;
  cache.set(url, data);
  return data;
}

export const getPokemonPage = (limit = 20, offset = 0, opts?: GetJsonOpts) =>
  getJson<PokemonListPage>(`/pokemon?limit=${limit}&offset=${offset}`, opts);

export const getPokemon = (nameOrId: string | number, opts?: GetJsonOpts) =>
  getJson<Pokemon>(`/pokemon/${nameOrId}`, opts);

export const getGlobalIndex = (opts?: GetJsonOpts) =>
  getJson<PokemonListPage>(`/pokemon?limit=20000&offset=0`, opts);

export const getType = (name: string, opts?: GetJsonOpts) =>
  getJson<TypeResponse>(`/type/${name}`, opts);

export const getPokemonSpecies = (nameOrId: string | number, opts?: GetJsonOpts) =>
  getJson<PokemonSpecies>(`/pokemon-species/${nameOrId}`, opts);

export const getEvolutionChain = (id: number, opts?: GetJsonOpts) =>
  getJson<EvolutionChain>(`/evolution-chain/${id}`, opts);
