import { Pokemon } from "../types/pokeapi";
import { useNavigate } from "react-router-dom";

type PokemonCardProps = {
  pokemon: Pokemon;
};

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const navigate = useNavigate();
  const art =
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.front_default ??
    "";

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.name}`);
  };

  return (
    <article className="card" onClick={handleClick}>
      <img className="card-image" src={art} alt={pokemon.name} loading="lazy" />
      <h3 className="card-title">
        #{pokemon.id} {capitalize(pokemon.name)}
      </h3>
      <div className="type-list">
        {pokemon.types.map((t) => (
          <span key={t.slot} className={`type-badge type-${t.type.name}`}>
            {capitalize(t.type.name)}
          </span>
        ))}
      </div>
    </article>
  );
}
