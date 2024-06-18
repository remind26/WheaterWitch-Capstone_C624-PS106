import Home from '../views/pages/home';
import WeatherWitch from '../views/pages/weather';
import Aboutus from '../views/pages/aboutus';
import Recipes from '../views/pages/resep-masak';
import MoviesPage from '../views/pages/menonton-film';
import Book from '../views/pages/membaca-buku';
import OutdoorActivity from '../views/pages/outdoor-activity';
import Login from '../views/pages/login';
import Logout from '../views/pages/logout';
import Register from '../views/pages/Register';

const routes = {
  '/': Login,
  '/login': Login,
  '/home': Home,
  '/weather': WeatherWitch,
  '/aboutus': Aboutus,
  '/resep-masak': Recipes,
  '/menonton-film': MoviesPage,
  '/membaca-buku': Book,
  '/outdoor-activity': OutdoorActivity,
  '/logout': Logout,
  '/register': Register,
};

export default routes;
