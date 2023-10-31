import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bgByType, borderByType } from "../constants/pokemon";

const PokemonDetail = () => {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(null);

  const getPercentStat = (statValue) => {
    const MAX_STAT_VALUE = 255;
    const percentStat = ((statValue * 100) / MAX_STAT_VALUE).toFixed(1);
    return `${percentStat}%`;
  };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <header className="flex-col h-[100px] relative">
        <div className="w-screen h-[60%] bg-red-500"></div>
        <div className="w-screen h-[40%] justify-end bg-black"></div>
        <div className="absolute top-5 left-5">
          <img
            className="w-[120px] h-[60px] sm:w-[200px]  "
            src="/title.png"
            alt=""
          />
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
      <main className="py-10 px-2 text-center capitalize ">
        <article className="max-w-[500px] mx-auto shadow-lg capitalize rounded-md text-center">
          <header
            className={`${bgByType[pokemon?.types[0].type.name]} h-[160px]`}
          >
            <img
              className="h-[200px] w-[200px] m-auto"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonId}.gif`}
              alt=""
            />
          </header>
          <h3 className="mt-[50px]">#{pokemon?.id}</h3>
          <h2 className="p-4 font-semibold text-lg">
            ---------- {pokemon?.name} -----------
          </h2>
          <section className="grid grid-cols-2">
            <div>
              <div>Type</div>
              <ul className="p-4 flex gap-1 justify-center">
                {pokemon?.types.map((type) => (
                  <li
                    className={`rounded-md px-4 py-2 ${
                      bgByType[type.type.name]
                    }`}
                  >
                    {type.type.name}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div>abilities</div>
              <div>
                <ul className="p-4 flex gap-1 justify-center">
                  {pokemon?.abilities.map((ability) => (
                    <li
                      className='border-2 rounded-md px-4 py-2'
                    >
                      {ability.ability.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <section className="p-4">
            <h3 className="text-start text-[20px] font-semibold p-4">Stats</h3>
            <ul className="grid gap-4">
              {pokemon?.stats.map((stat) => (
                <li className="capitalize font-semibold" key={stat.stat.name}>
                  <div className="flex justify-between items-center">
                    <h5>{stat.stat.name}</h5>
                    <span>{stat.base_stat}/255</span>
                  </div>
                  <div className="bg-slate-200 rounded-md h-6">
                    <div
                      style={{ width: getPercentStat(stat.base_stat) }}
                      className="bg-yellow-500 h-full"
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>
    </>
  );
};

export default PokemonDetail;
