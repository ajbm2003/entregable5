import React from 'react';
import { setTrainerName } from '../store/slices/trainerName.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSudmut= (e)=>{
        e.preventDefault()
        dispatch(setTrainerName(e.target.trainerName.value))
        navigate("/pokedex")
    }
    return (
        <>
        <main className='h-screen'  style={{ backgroundImage: `url(${'/background_pokedex.jpg'})`,  backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
            <section className='grid m-auto justify-center text-center pt-[130px]'>
                <div className='absolute left-[100px] grid gap-4 sm:relative'>
                    <div><img className='sm:w-[600px] w-[270px]' src="/title.png" alt="" />
                    </div>
                    <h3 className='text-4xl font-bold text-white'>Hello Coach!</h3>
                    <p className='text-lg font-semibold text-white'>To start give me your name: </p>
                    <form onSubmit={handleSudmut}>
                        <input className='sm:w-[300px] h-[40px] w-[150px]' name="trainerName" type="text" placeholder='Your name...' />
                        <button className='py-2 px-4 bg-red-300'>Start!</button>
                    </form>
                </div>
            </section>
        </main>
        </>
    );
};

export default Home;