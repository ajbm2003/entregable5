import React from "react";
import PokemonCard from "./PokemonCard";

const PokemonList = ({ pokemons }) => {
  return (
    <section className="m-auto justify-center max-w-[1024px] gap-5 grid grid-cols-[repeat(auto-fit,_minmax(270px,_300px))]">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url}/>
      ))}
    </section>
  );
};

export default PokemonList;
