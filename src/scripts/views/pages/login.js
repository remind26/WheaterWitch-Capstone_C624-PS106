const Login = {
  async render() {
    return `
      <div class="login-container">
        <img src="./images/logo-2.png" alt="Logo" class="logo">
        <h1>Login</h1>
        <form id="loginForm">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" required>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required>
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="#/register" id="registerLink">Register here</a></p>
        <div id="loginError" class="error-message"></div>
      </div>
    `;
  },

  async afterRender() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          const errorMessage = await response.json();
          document.getElementById('loginError').innerText = errorMessage.message;
          return;
        }

        sessionStorage.setItem('isLoggedIn', 'true');
        window.location.hash = '#/home'; // Redirect to home page after successful login
      } catch (error) {
        console.error('Error:', error);
      }
    });
  },
};

export default Login;
