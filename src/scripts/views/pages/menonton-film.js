/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
import MovieService from "../../data/movieService";

const MoviesPage = {
  async render() {
    return `
        <div class="movies-container">
          <h1 class="movies-title">Daftar Film Populer</h1>
          <div class="search-container">
            <input type="text" id="search-movies" placeholder="Cari Film..."/>
            <button id="search-button">Cari</button>
          </div>
          <div class="movies-list" id="movies-list"></div>
          <div id="loading" class="loading-spinner" style="display:none;"></div>
          <div id="movie-modal" class="modal">
            <div class="modal-content">
              <span class="close-button">&times;</span>
              <img id="modal-image" src="" alt="Movie Image"/>
              <h3 id="modal-title"></h3>
              <p id="modal-description"></p>
            </div>
          </div>
        </div>
    `;
  },

  async afterRender() {
    const moviesList = document.getElementById('movies-list');
    const loadingSpinner = document.getElementById('loading');
    loadingSpinner.style.display = 'block';

    try {
      const movieService = new MovieService();
      const movies = await movieService.fetchMovies();
      movieService.displayMovies(movies, moviesList);
    } catch (error) {
      moviesList.innerHTML = '<p>Error fetching movies data. Please try again.</p>';
    } finally {
      loadingSpinner.style.display = 'none';
    }

    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', async () => {
      const query = document.getElementById('search-movies').value;
      try {
        const movieService = new MovieService();
        const movies = await movieService.searchMovies(query);
        movieService.displayMovies(movies, moviesList);
      } catch (error) {
        moviesList.innerHTML = '<p>Error fetching search results. Please try again.</p>';
      }
    });

    const modal = document.getElementById('movie-modal');
    const closeModal = document.querySelector('.close-button');
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };

    moviesList.addEventListener('click', (event) => {
      if (event.target.closest('.movie-item')) {
        const movieItem = event.target.closest('.movie-item');
        const image = movieItem.querySelector('img').src;
        const title = movieItem.querySelector('h3').innerText;
        const description = movieItem.querySelector('p').innerText;

        document.getElementById('modal-image').src = image;
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-description').innerText = description;
        modal.style.display = 'block';
      }
    });
  }
};

export default MoviesPage;
