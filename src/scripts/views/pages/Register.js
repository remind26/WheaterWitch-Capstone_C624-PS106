const Register = {
  async render() {
    return `
      <div class="register-container">
        <img src="./images/logo-2.png" alt="Logo" class="logo">
        <h1>Register</h1>
        <form id="registerForm">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" required>
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required>
          <button type="submit">Register</button>
        </form>
        <div id="registerError" class="error-message"></div>
        <p>Already have an account? <a href="#/login" id="loginLink">Login here</a></p>
      </div>
    `;
  },

  async afterRender() {
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
          const errorMessage = await response.json();
          document.getElementById('registerError').innerText = errorMessage.message;
          return;
        }

        window.location.hash = '#/login';
      } catch (error) {
        console.error('Error during registration:', error);
        document.getElementById('registerError').innerText = 'Failed to register.';
      }
    });
  },
};

export default Register;
