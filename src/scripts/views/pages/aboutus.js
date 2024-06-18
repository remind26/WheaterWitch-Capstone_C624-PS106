/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
const aboutus = {
    async render() {
        return `
            <div class="about-us-container">
                <h1>Tentang Aplikasi</h1>
                <div class="card about-app-card">
                    <div class="card-info">
                        <p>WeatherWitch adalah sebuah platform yang mengintegrasikan data cuaca
                        dengan rekomendasi aktivitas personalisasi. Cuaca memiliki dampak signifikan
                        terhadap kegiatan sehari-hari kita, baik di dalam maupun di luar ruangan. Oleh
                        karena itu, ada kebutuhan untuk sebuah solusi yang dapat memberikan panduan
                        cepat dan tepat mengenai aktivitas yang sesuai dengan kondisi cuaca saat ini.
                        Banyak orang kesulitan dalam memutuskan aktivitas apa yang harus dilakukan
                        berdasarkan kondisi cuaca. Keputusan ini seringkali tidak efisien, mengakibatkan
                        waktu yang terbuang dan peluang untuk menikmati hari yang baik terlewatkan.
                        </p>
                    </div>
                </div>
                <h1>Tim Kami</h1>
                <div class="card-container">
                    <div class="card">
                        <img src="../images/profile/ridhwan.jpg" alt="Photo of Person 1" class="card-img">
                        <div class="card-info">
                            <h2>Muhammad Ridhwan Ramadhan</h2>
                            <p>Universitas Amikom Yogyakarta</p>
                            <p>F1836YB171</p>
                        </div>
                    </div>
                    <div class="card">
                        <img src="../images/profile/zilva.jpg" alt="Photo of Person 2" class="card-img">
                        <div class="card-info">
                            <h2>Zilva Nur Fajrul Falaq</h2>
                            <p>Universitas Amikom Yogyakarta</p>
                            <p>F1836YB183</p>
                        </div>
                    </div>
                    <div class="card">
                        <img src="../images/profile/venesse.jpg" alt="Photo of Person 3" class="card-img">
                        <div class="card-info">
                            <h2> Venesse Kaylasha Alvino Putri</h2>
                            <p>Universitas Janabadra</p>
                            <p>F6156XB247</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    afterRender() {
        // Implementasi tambahan setelah render jika diperlukan
    }
};

export default aboutus;
