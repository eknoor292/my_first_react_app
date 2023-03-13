import React from 'react';
import { useState, useEffect } from 'react';

import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=aee75316';

const movie1 = {
    "Title": "Deadpool 2",
    "Year": "2018",
    "imdbID": "tt5463162",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMDkzNmRhNTMtZDI4NC00Zjg1LTgxM2QtMjYxZDQ3OWJlMDRlXkEyXkFqcGdeQXVyNTU5MjkzMTU@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) =>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }
    useEffect(()=>{
        searchMovies('deadpool');
    }, []);  

    return (
    <div className = "app">
        <h1>MovieLand</h1>

        <div className='search'>
            <input
                placeholder="Search for movies"
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
            />

            <img src={SearchIcon}
                alt="search"
                onClick={()=>searchMovies(searchTerm)}
            />
        </div>

        {
            movies?.length > 0 ? (
                <div className='container'>
                    {
                        movies.map((movie) => (<MovieCard movie={movie}/>))
                    }

                    
                </div>
            ):(
                <div className='empty'>
                    <h2>No movies found!</h2>
                </div>
            )
            
        }
        
        
            
    </div>
    );
}
export default App;