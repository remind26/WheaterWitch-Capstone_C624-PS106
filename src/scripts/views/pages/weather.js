/* eslint-disable arrow-parens */
/* eslint-disable no-else-return */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-trailing-spaces */
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
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const weatherList = document.getElementById('weather-list');
    const loadingSpinner = document.getElementById('loading');

    searchButton.addEventListener('click', async () => {
      const location = searchInput.value.trim();
      if (location) {
        weatherList.innerHTML = '';
        loadingSpinner.style.display = 'block';

        try {
          const weatherData = await fetchWeatherData(location);
          displayWeatherData(weatherData, weatherList);
        } catch (error) {
          weatherList.innerHTML = '<p>Error fetching weather data. Please try again.</p>';
        } finally {
          loadingSpinner.style.display = 'none';
        }
      }
    });
  },
};

async function fetchWeatherData(location) {
  const apiKey = 'fdb8a4b15ff64f64b6253118240306';
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`);

  if (!response.ok) {
    throw new Error('Weather data not found');
  }

  const data = await response.json();
  return data;
}

function displayWeatherData(data, container) {
  const conditionText = data.current.condition.text.toLowerCase();
  const outdoorConditions = ['sunny', 'clear', 'partly cloudy'];
  const isOutdoorWeather = outdoorConditions.some(condition => conditionText.includes(condition));
  const recommendation = isOutdoorWeather
    ? "Cuaca cerah! Waktu yang sempurna untuk kegiatan luar ruangan. Nikmati harimu di luar!"
    : "Cuaca sedang kurang bersahabat. Ini adalah kesempatan bagus untuk menikmati kegiatan dalam ruangan.";

  const weatherHtml = `
    <div class="weather-item">
      <h2>${data.location.name}, ${data.location.region}</h2>
      <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}" />
      <p>${data.current.condition.text}</p>
      <p>Temperature: ${data.current.temp_c}°C</p>
      <p>Humidity: ${data.current.humidity}%</p>
      <p>Wind speed: ${data.current.wind_kph} kph</p>
      <p>${recommendation}</p>
      <button id="activityButton">Lihat Rekomendasi Aktivitas</button>
      <div id="activityList" class="activity-list"></div>
    </div>
  `;
  container.innerHTML = weatherHtml;

  const activityButton = document.getElementById('activityButton');
  const activityList = document.getElementById('activityList');

  activityButton.addEventListener('click', () => {
    if (isOutdoorWeather) {
      window.location.hash = '/outdoor-activity';
    } else {
      const activities = getActivitiesBasedOnWeather(data.current.condition.text);
      displayActivities(activities, activityList);
    }
  });
}

function getActivitiesBasedOnWeather(condition) {
  const outdoorActivities = ['Taman', 'Alun-alun', 'Wisata Alam'];
  const indoorActivities = ['Membaca buku', 'Menonton film', 'Resep Masak'];

  const conditionText = condition.toLowerCase();
  const outdoorConditions = ['sunny', 'clear', 'partly cloudy'];

  if (outdoorConditions.some(cond => conditionText.includes(cond))) {
    return outdoorActivities;
  } else {
    return indoorActivities;
  }
}

function displayActivities(activities, container) {
  const activitiesHtml = activities
    .map(activity => `<li><a href="#/${activity.toLowerCase().replace(/\s+/g, '-')}">${activity}</a></li>`)
    .join('');
  container.innerHTML = `<ul>${activitiesHtml}</ul>`;
}

export default WeatherWitch;
