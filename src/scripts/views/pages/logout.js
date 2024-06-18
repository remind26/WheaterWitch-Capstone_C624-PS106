const Logout = {
  async render() {
    sessionStorage.removeItem('isLoggedIn');
    window.location.hash = '#/login';
  },
};

export default Logout;
