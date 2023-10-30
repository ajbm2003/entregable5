import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { bgByType, borderByType } from '../constants/pokemon';
const PokemonCard = ({pokemonUrl}) => {
    const [pokemon, setPokemon]= useState(null);

    useEffect(()=>{
        axios
        .get(pokemonUrl)
        .then(({data})=> setPokemon(data))
        .catch((err)=>console.log(err))
    },[])

    return (
        <Link className={`${borderByType[pokemon?.types[0].type.name]} capitalize border-8 rounded-md text-center`} to={`/pokedex/${pokemon?.id}`}>
            <header className={`${bgByType[pokemon?.types[0].type.name]} h-[160px]`}></header>
            <div className='relative pt-14'>
                <div className='absolute top-0 -translate-y-3/4'><img className='px-16 h-[220px]' src={pokemon?.sprites.other["official-artwork"].front_default} alt="" /></div>
                <h3 className='text-xl font-semibold'>{pokemon?.name}</h3>
                <span className='text-sm font-semibold'>{pokemon?.types.map((type)=>type.type.name).join(" / ")}</span>
                <h5 className='font-semibold text-slate-500 text-sm'>Type</h5>
                <ul className='grid grid-cols-2 text-sm p-2 '>
                    {
                        pokemon?.stats.slice(0,4).map((stat) =>(
                            <li className='grid gap-1' key={stat.stat.name}>
                                <h6 className='font-semibold'>{stat.stat.name}</h6>
                                <span className='font-bold'>{stat.base_stat}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </Link>
    );
};

export default PokemonCard;