import React, {useState, useEffect} from 'react';
import {
    fetchMovies,
    fetchWatchedMovies,
    addMovie,
    removeMovie,
    addWatchedMovie,
    removeWatchedMovie,
} from './MoviesApi';
import NewMovieForm from './NewMovieForm';
import MovieList from './MovieList';
import './App.css';

function App(props) {
    const [movies, setMovies] = useState([]);
    const [watchedMovies, setWatchedMovies] = useState([]);

    const handleAddNewMovie = (movie) => {
        addMovie(movie).then((newMovie) =>
            setMovies((prev) => [...prev, newMovie]),
        );
    };

    const handleAddNewWatchedMovie = (movie) => {
        addWatchedMovie(movie)
            .then((newMovie) => {
                setWatchedMovies((prev) => [...prev, newMovie]);
                return newMovie;
            })
            .then(removeMovie.bind(movie))
            .then((newMovie) => {
                setMovies((prev) => prev.filter(({id}) => id !== newMovie.id));
            })
            .catch((error) => console.log(error));
    };

    const handleRemoveWatchedMovie = (movie) => {
        removeWatchedMovie(movie.id)
            .then(() => {
                setWatchedMovies((prev) => prev.filter(({id}) => id !== movie.id));
            });
    };

    useEffect(() => {
        fetchMovies().then((data) => setMovies(data));
        fetchWatchedMovies().then((data) => setWatchedMovies(data));
    }, []);

    return (
        <div className="app">
            <h1>Codest Movies</h1>
            <div className="wrapper">
                <NewMovieForm onSubmit={handleAddNewMovie}/>
                <div className="content">
                    <div>
                        <h1>Watchlist:</h1>
                        <MovieList movies={movies} onClick={handleAddNewWatchedMovie}/>
                    </div>
                    <div>
                        <h1>Already watched:</h1>
                        <MovieList movies={watchedMovies} onClick={handleRemoveWatchedMovie}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
