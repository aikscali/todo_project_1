export function initLogin() {
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const loginButton = document.getElementById('login-button');
  const spinner = document.getElementById('spinner');
  const successMessage = document.getElementById('success-message');
  const errorAnnouncement = document.getElementById('error-announcement');

  const API_BASE_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';
  const LOGIN_URL = `${API_BASE_URL}/api/v1/users/login`;

  emailInput.addEventListener('input', validateForm);
  passwordInput.addEventListener('input', validateForm);

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
      loginUser();
    }
  });

  function validateEmail() {
    const email = emailInput.value.trim();
    if (email === '') {
      showError(emailInput, emailError, 'El correo electrónico es obligatorio');
      return false;
    } else {
      clearError(emailInput, emailError);
      return true;
    }
  }

  function validatePassword() {
    const password = passwordInput.value.trim();
    if (password === '') {
      showError(passwordInput, passwordError, 'La contraseña es obligatoria');
      return false;
    } else if (password.length < 8) {
      showError(passwordInput, passwordError, 'Debe tener al menos 8 caracteres');
      return false;
    } else {
      clearError(passwordInput, passwordError);
      return true;
    }
  }

  function validateForm() {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    loginButton.disabled = !(isEmailValid && isPasswordValid);
    return isEmailValid && isPasswordValid;
  }

  function showError(input, errorElement, message) {
    input.classList.add('invalid');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    if (errorAnnouncement) errorAnnouncement.textContent = message;
  }

  function clearError(input, errorElement) {
    input.classList.remove('invalid');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }

  async function loginUser() {
    spinner.style.display = 'block';
    loginButton.disabled = true;
    successMessage.style.display = 'none';

    const loginData = {
      email: emailInput.value.trim().toLowerCase(),
      password: passwordInput.value.trim()
    };

    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al iniciar sesión');

      successMessage.textContent = 'Inicio de sesión exitoso';
      successMessage.style.display = 'block';
    } catch (err) {
      showError(emailInput, emailError, err.message);
    } finally {
      spinner.style.display = 'none';
      loginButton.disabled = false;
    }
  }
}