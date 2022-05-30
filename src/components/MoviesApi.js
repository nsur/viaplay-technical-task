import initialState from "../default-movies-list.json"

export const fetchMovies = () =>
    new Promise((resolve) => {
        try {
            let data = JSON.parse(localStorage.getItem('movies-all'));
            if (data === null) {
                data = initialState;
                localStorage.setItem('movies-all', JSON.stringify(data));
            }
            resolve(data);
        } catch (error) {
            console.log(error);
            resolve(initialState);
        }
    });

export const fetchWatchedMovies = () =>
    new Promise((resolve) => {
        try {
            const data = JSON.parse(localStorage.getItem('movies-watched')) || [];
            resolve(data);
        } catch (error) {
            console.log(error);
            resolve([]);
        }
    });

export const addMovie = (newMovie) =>
    new Promise((resolve) => {
        fetchMovies().then((movies) => {
            const newMovieWithId = {
                id: Date.now(),
                ...newMovie,
            };
            const newMoviesList = [...movies, newMovieWithId];

            localStorage.setItem('movies-all', JSON.stringify(newMoviesList));
            resolve(newMovieWithId);
        });
    });

export const removeMovie = (newMovie) =>
    new Promise((resolve) => {
        fetchMovies().then((movies) => {
            const newMoviesList = movies.filter((movie) => movie.id !== newMovie.id);

            localStorage.setItem('movies-all', JSON.stringify(newMoviesList));
            resolve(newMovie);
        });
    });

export const addWatchedMovie = (newMovie) =>
    new Promise((resolve, reject) => {
        fetchWatchedMovies().then((movies) => {
            if (movies.find(({id}) => id === newMovie.id)) {
                reject('the movie already in the watched list');
                return;
            }

            const newMoviesList = [...movies, newMovie];

            localStorage.setItem('movies-watched', JSON.stringify(newMoviesList));
            resolve(newMovie);
        });
    });

export const removeWatchedMovie = (id) =>
    new Promise((resolve) => {
        fetchWatchedMovies().then((movies) => {
            const newMoviesList = movies.filter((movie) => movie.id !== id);

            localStorage.setItem('movies-watched', JSON.stringify(newMoviesList));
            resolve();
        });
    });