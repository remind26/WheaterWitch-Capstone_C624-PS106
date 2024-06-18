/* eslint-disable class-methods-use-this */
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import DrawerInitiator from '../utils/drawer-initiator';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });

    this._addLogoutListener();
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    console.log('Parsed URL:', url); // Debugging URL
    if (!this._isLoggedIn() && url !== '/' && url !== '/register') {
      window.location.hash = '#/';
      return;
    }
    const page = routes[url];
    console.log('Current Page:', page); // Debugging Page
    if (page) {
      this._content.innerHTML = await page.render();
      await page.afterRender();
      this._addLogoutListener(); // Add listener after rendering page
    }
  }

  _isLoggedIn() {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  }

  _addLogoutListener() {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        this._logout();
      });
    }
  }

  _logout() {
    sessionStorage.removeItem('isLoggedIn');
    window.location.hash = '#/';
    window.location.reload();
  }
}

export default App;
