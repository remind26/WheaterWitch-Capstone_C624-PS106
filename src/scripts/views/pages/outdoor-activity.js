/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable default-case */
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet.fullscreen';
import 'leaflet-easybutton/src/easy-button.css';
import 'leaflet-easybutton';

const OutdoorActivity = {
  async render() {
    return `
        <div class="outdoor-activity">
          <h1>Kegiatan Aktivitas Luar Ruangan</h1>
          <div class="activity-list">
            <div class="activity-item">
              <img src="../images/asset/taman.jpg" alt="Taman">
              <h2>Taman</h2>
              <p>Deskripsi: Nikmati udara segar dan pemandangan hijau di taman. Berjalan-jalan santai, bermain dengan anak-anak, atau sekadar duduk dan menikmati suasana alam yang tenang.</p>
              <p>Manfaat: Relaksasi, olahraga ringan, piknik, dan meningkatkan kesejahteraan mental.</p>
            </div>
            <div class="activity-item">
              <img src="../images/asset/alun-alun.jpg" alt="Alun-alun">
              <h2>Alun-alun</h2>
              <p>Deskripsi: Tempat berkumpul yang sempurna dengan berbagai kegiatan seperti pasar malam, festival, dan acara komunitas. Lokasi ini menawarkan suasana yang hidup dan berbagai pilihan kuliner.</p>
              <p>Manfaat: Sosialisasi, hiburan, eksplorasi budaya, dan menikmati kuliner lokal.</p>
            </div>
            <div class="activity-item">
              <img src="../images/asset/wisata-alam.jpg" alt="Wisata Alam">
              <h2>Wisata Alam</h2>
              <p>Deskripsi: Jelajahi keindahan alam seperti pegunungan, pantai, dan hutan. Aktivitas ini menawarkan pengalaman petualangan dan kesempatan untuk lebih dekat dengan alam.</p>
              <p>Manfaat: Kebugaran fisik, eksplorasi, pendidikan lingkungan, dan kesenangan.</p>
            </div>
            <div class="activity-item">
              <img src="../images/asset/sepeda.jpg" alt="Bersepeda">
              <h2>Bersepeda</h2>
              <p>Deskripsi: Aktivitas bersepeda di jalur sepeda khusus atau di sekitar kota. Ini adalah cara yang bagus untuk menjaga kebugaran dan menikmati pemandangan sekitar.</p>
              <p>Manfaat: Meningkatkan kebugaran kardiovaskular, memperkuat otot, dan meningkatkan kesehatan mental.</p>
            </div>
            <div class="activity-item">
              <img src="../images/asset/mendaki.jpg" alt="Mendaki">
              <h2>Mendaki</h2>
              <p>Deskripsi: Aktivitas mendaki di jalur alam atau pegunungan. Menikmati pemandangan indah dan udara segar sambil berolahraga.</p>
              <p>Manfaat: Meningkatkan kekuatan otot, kebugaran kardiovaskular, dan kesehatan mental.</p>
            </div>
            <div class="activity-item">
              <img src="../images/asset/main-dipantai.jpg" alt="Bermain di Pantai">
              <h2>Bermain di Pantai</h2>
              <p>Deskripsi: Nikmati waktu di pantai dengan berjemur, berenang, atau bermain voli pantai. Pantai menawarkan relaksasi dan berbagai kegiatan air.</p>
              <p>Manfaat: Relaksasi, olahraga, vitamin D dari sinar matahari, dan kesenangan.</p>
            </div>
            <div class="activity-item">
              <img src="../images/asset/kemah.jpg" alt="Berkemah">
              <h2>Berkemah</h2>
              <p>Deskripsi: Menghabiskan waktu di alam dengan berkemah di tempat yang disediakan. Nikmati malam di bawah bintang-bintang dan suara alam.</p>
              <p>Manfaat: Koneksi dengan alam, relaksasi, pendidikan lingkungan, dan kebersamaan keluarga atau teman.</p>
            </div>
            <div class="activity-item">
              <img src="../images/asset/mancing.jpg" alt="Memancing">
              <h2>Memancing</h2>
              <p>Deskripsi: Aktivitas memancing di sungai, danau, atau laut. Memancing adalah cara yang baik untuk bersantai dan menikmati keindahan alam.</p>
              <p>Manfaat: Relaksasi, kesabaran, fokus, dan kesempatan untuk mendapatkan hasil tangkapan yang segar.</p>
            </div>
            <div class="activity-item">
              <img src="../images/asset/kebun.jpg" alt="Berkebun">
              <h2>Berkebun</h2>
              <p>Deskripsi: Aktivitas berkebun di halaman rumah atau komunitas kebun. Menanam bunga, sayuran, atau tanaman hias lainnya.</p>
              <p>Manfaat: Relaksasi, aktivitas fisik, belajar tentang botani, dan hasil panen yang segar.</p>
            </div>
            <div class="activity-item">
              <img src="../images/asset/foto-alam.jpg" alt="Fotografi Alam">
              <h2>Fotografi Alam</h2>
              <p>Deskripsi: Menangkap keindahan alam melalui lensa kamera. Aktivitas ini cocok untuk pecinta fotografi dan alam.</p>
              <p>Manfaat: Kreativitas, eksplorasi alam, pengembangan keterampilan fotografi, dan relaksasi.</p>
            </div>
          </div>
          <div class="activity-item">
          <div id="map" class="map-container"></div>
          </div>
          </div>
      `;
  },

  async afterRender() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert('Geolocation is not supported by this browser.');
    }

    function showPosition(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const map = L.map('map').setView([lat, lon], 13);

      const baseLayers = {
        OpenStreetMap: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }),
        Satellite: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors',
        }),
      };

      baseLayers.OpenStreetMap.addTo(map);

      L.control.layers(baseLayers).addTo(map);
      L.control.scale().addTo(map);
      L.control.fullscreen().addTo(map);

      L.marker([lat, lon]).addTo(map)
        .bindPopup('Lokasi Anda')
        .openPopup();

      L.Control.geocoder().addTo(map);

      L.easyButton('<span class="star">&starf;</span>', (btn, map) => {
        map.setView([lat, lon], 13);
      }).addTo(map);
    }

    function showError(error) {
      let errorMessage = '';
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'User denied the request for Geolocation.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Location information is unavailable.';
          break;
        case error.TIMEOUT:
          errorMessage = 'The request to get user location timed out.';
          break;
        case error.UNKNOWN_ERROR:
          errorMessage = 'An unknown error occurred.';
          break;
      }
      alert(errorMessage);

      // Default location (e.g., Jakarta, Indonesia)
      const map = L.map('map').setView([-6.1751, 106.865], 13);

      const baseLayers = {
        OpenStreetMap: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }),
        Satellite: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors',
        }),
      };

      baseLayers.OpenStreetMap.addTo(map);

      L.control.layers(baseLayers).addTo(map);
      L.control.scale().addTo(map);
      L.control.fullscreen().addTo(map);

      L.marker([-6.1751, 106.865]).addTo(map)
        .bindPopup('Jakarta')
        .openPopup();

      L.Control.geocoder().addTo(map);

      L.easyButton('<span class="star">&starf;</span>', (btn, map) => {
        map.setView([-6.1751, 106.865], 13);
      }).addTo(map);
    }
  },
};

export default OutdoorActivity;
