import Home from '../views/pages/home';
import WeatherWitch from '../views/pages/weather';
import Aboutus from '../views/pages/aboutus';
import Recipes from '../views/pages/resep-masak';
import MoviesPage from '../views/pages/menonton-film';
import Book from '../views/pages/membaca-buku';
import OutdoorActivity from '../views/pages/outdoor-activity';

const routes = {
  '/': Home,
  '/home': Home,
  '/weather': WeatherWitch,
  '/aboutus': Aboutus,
  '/resep-masak': Recipes,
  '/menonton-film': MoviesPage,
  '/membaca-buku': Book,
  '/outdoor-activity': OutdoorActivity,
};

export default routes;
