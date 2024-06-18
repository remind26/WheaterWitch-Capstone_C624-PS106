/* eslint-disable no-empty-function */
const WeatherWitch = {
  async render() {
    return `
      <div class="hero" id="hero">
      <img src="./images/heros/hero-image_2.jpg" alt="Hero Image">
      <div class="hero-text" tabindex="0">
        <h1>Welcome to WeatherWitch</h1>
        <p>Reliable activity detection with weather</p>
      </div>
    </div>
        <div class="weather-container">
          <h1 class="weather-title">WeatherWitch</h1>
          <div class="search-container">
            <input type="text" id="searchInput" placeholder="Masukkan lokasi anda disini..." tabindex="0">
            <button id="searchButton" tabindex="0">Cari</button>
          </div>
          <div class="weather-list" id="weather-list" tabindex="-1"></div>
          <div id="loading" class="loading-spinner" style="display:none;"></div>
        </div>
      `;
  },

  async afterRender() {
  },
};

export default WeatherWitch;
