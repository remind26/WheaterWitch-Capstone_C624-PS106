/* eslint-disable no-param-reassign */
class MovieService {
  constructor() {
    this.apiKey = '436cfa50a075507aefe87fded5c5c2f2'; // Ganti dengan API key TMDb Anda
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.baseImageUrl = 'https://image.tmdb.org/t/p/w500/';
  }

  async fetchMovies() {
    const response = await fetch(`${this.baseUrl}movie/popular?api_key=${this.apiKey}&language=id-ID&page=1`);

    if (!response.ok) {
      throw new Error('Data film tidak ditemukan');
    }

    const data = await response.json();
    return data.results;
  }

  displayMovies(movies, container) {
    const moviesHtml = movies
      .map((movie) => `
          <div class="movie-item">
            <img src="${this.baseImageUrl}${movie.poster_path}" alt="${movie.title}" />
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
            <p>Rating: ${movie.vote_average}</p>
          </div>
        `)
      .join('');
    container.innerHTML = `<div class="movies-list">${moviesHtml}</div>`;
  }
}

export default MovieService;
