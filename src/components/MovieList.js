import React from 'react';
import MovieItem from './MovieItem';

const MovieList = ({movies, onClick}) => {
    return (
        <div className="movies-list">
            {movies.map((movie) => (
                <MovieItem key={movie.id} movie={movie} onClick={() => onClick(movie)}/>
            ))}
        </div>
    )
}

export default MovieList;