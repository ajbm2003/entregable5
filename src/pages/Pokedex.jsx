import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import PokemonList from "../components/PokemonList";

const Pokedex = () => {
  const trainerName = useSelector((store) => store.trainerName);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState("");
  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.includes(pokemonName)
  );

  const handleChangeType = (e) => {
    setCurrentType(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value.toLowerCase().trim());
  };

  useEffect(() => {
    if (currentType === "") {
      axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=100")
        .then(({ data }) => setPokemons(data.results))
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then(({ data }) => setTypes(data.results))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (currentType !== "") {
      axios
        .get(`https://pokeapi.co/api/v2/type/${currentType}/`)
        .then(({ data }) =>
          setPokemons(data.pokemon.map((pokemon) => pokemon.pokemon))
        )
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  return (
    <main>
      <header className="flex-col h-[100px] relative">
        <div className="w-screen h-[60%] bg-red-500"></div>
        <div className="w-screen h-[40%] justify-end bg-black"></div>
        <div className="absolute top-5 left-5">
          <img className="w-[120px] h-[60px] sm:w-[200px]  " src="/title.png" alt="" />
        </div>
        <div className="absolute top-10 sm:right-24 right-10">
          <svg
            width="50"
            height="50"
            viewBox="0 0 117 117"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              id="Ellipse 3"
              cx="58.5"
              cy="58.5"
              r="52.5"
              fill="white"
              stroke="black"
              stroke-width="12"
            />
          </svg>
        </div>
      </header>
      <section className=" py-4 gap-4 grid justify-center text-center">
        <p className="sm:text-lg text-base font-semibold">
          Welcome
          <span className="text-red-500"> {trainerName}</span>
          , here you can find your favorte pokemon!
        </p>
        <form onSubmit={handleSubmit} className="flex">
          <div>
            <input className="border rounded-md p-2 shadow-md sm:w-[300px]"  name="pokemonName" type="text" />
            <button className="p-2 bg-red-500 rounded-md">Search</button>
          </div>
          <select className='border-4 rounded-md sm:w-[200px]'onChange={handleChangeType}>
            <option value="">All pokemons</option>
            {types.map((type) => (
              <option value={type.name} className="capitalize"  key={type.url}>
                {type.name}
              </option>
            ))}
          </select>
        </form>
      </section>
      <PokemonList pokemons={pokemonsByName} />
    </main>
  );
};

export default Pokedex;
