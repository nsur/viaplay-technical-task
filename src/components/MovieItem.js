import React from 'react';

const MovieItem = ({movie, onClick}) => {
    return (
        <div className="movie" onClick={onClick}>
            <img src={movie.image} height="100px" alt="poster"/>
            <b>{movie.title}</b>
            <span>{movie.comment}</span>
        </div>
    );
};

export default MovieItem;