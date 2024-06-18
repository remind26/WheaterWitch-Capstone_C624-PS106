const Home = {
  async render() {
    return `
      <div class="home-container">
        <div class="home-app-card">
          <div class="card-info-home">
            <h1>Welcome to WeatherWitch</h1>
            <h3>Prediksi Cuaca & Rekomendasi Aktivitas</h3>
            <p>Cuaca tidak harus menjadi penghalang untuk menikmati hari Anda. Dengan WeatherWitch, kami membantu Anda agar tetap produktif dengan segala kondisi cuaca.</p>
            <button id="start-button" class="start-button">Mulai Sekarang</button>
          </div>
          <div class="logo-container">
            <img src="./images/logo-2.png" alt="Logo Home">
          </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', () => {
      window.location.hash = '#/weather';
    });
  },
};

export default Home;
