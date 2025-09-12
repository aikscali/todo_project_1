document.addEventListener('DOMContentLoaded', function(){
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const loginButton = document.getElementById('login-button');
    const spinner = document.getElementById('spinner');
    const successMessage = document.getElementById('success-message');
    const errorAnnouncement = document.getElementById('error-announcement');

    //URLs de la API
    const API_BASE_URL = 'http://localhost:8080/api';
    const LOGIN_URL = `${API_BASE_URL}/api/login`;

    //Validación en tiempo real
    emailInput.addEventListener('input', validateForm);
    passwordInput.addEventListener('input', validateForm);

    //Validación específica para email al perder el foco
    emailInput.addEventListener('blur', function(){
        validateEmail();
        validateForm();
    });

    passwordInput.addEventListener('blur', function(){
        validatePassword();
        validateForm();
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if(validateForm()){
            loginUser();
        }
    });

    function validateEmail() {
        const email = emailInput.value.trim();

        if ( email == '') {
            showError(emailInput, emailError, 'El correo electrónico es obligatorio');
            return false;
        }
        else{
            clearError(emailInput, emailError);
            return true;
        }
    }

    function validatePassword() {
        const password = passwordInput.value.trim();

        if(password == '') {
            showError(passwordInput, passwordError, 'La contraseña es obligatoria');
            return false;
        }
        else if (password.length < 8) {
            showError(passwordInput, passwordError, 'la contraseña debe tener al menos 8 caracteres');
        } 
        else {
            clearError(passwordInput, passwordError);
            return true;
        }
    }

    function validateForm() {
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        loginButton.disabled = !(isEmailValid && isPasswordValid);
    }

    function showError(input, errorElement, message) {
        input.classList.add('invalid');
        errorElement.textContent = message;
        errorElement.style.display = 'block';

        if(errorAnnouncement) {
            errorAnnouncement.textContent = message;
        }
    }

    function clearError(input, errorElement) {
        input.classList.remove('invalid');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    };

    async function login() {
        //mostrar spinner
        if (spinner) spinner.style.display = 'block';
        loginButton.disabled = true;

        if (successMessage) successMessage.style.display = 'none';

        const loginData = {
            email: emailInput.value.trim(),
            password: passwordInput.value.trim()
        };

        try {
            //realizar petición al back
            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                bosy: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (spinner) spinner.style.display = 'none';

            if(response.ok) {
                handleLoginSuccess(data);
            }
            else {
                handleLoginError(response.status, data);
            }
        }
        catch (error) {
            if(spinner) spinner.style.display = 'none';
            loginButton.disabled = false;
            showError(emailInput, emailError, 'Error de conexión. Intenta nuevamente.');
            if (errorAnnouncement){
                errorAnnouncement.textContent = 'Error de conexión. Intenta nuevamente.';
            }

            console.error('Error en login:', error)
        }

    }

    function handleLoginSuccess(data) {
        if(data.id) {
            localStorage.setItem('userId', data.id);
        }

        if (successMessage) {
            successMessage.textContent = '';
            successMessage.style.display = 'block';
        }

        setTimeout(()=>{
            window.location.href = '/dashboard';
        }, 1500);
    }

    function handleLoginError(statusCode, data) {
        loginButton.disabled = false;

        switch(statusCode) {
            case 404:
                showError(emailInput, emailError, 'Correo electrónico no encontrado');
                if(errorAnnouncement) {
                    errorAnnouncement.textContent = 'Correo electrónico no encontrado';
                }

                break;
            
            case 401:
                showError(passwordInput, passwordError, 'Contraseña incorrecta');
                if(errorAnnouncement) {
                    errorAnnouncement.textContent = 'Contraseña incorrecta';
                }

                break;
            
            case 400:
                const errorMsg = data.message || 'Error en la solicitud';
                showError(emailInput, emailError, errorMsg);
                if(errorAnnouncement) {
                    errorAnnouncement.textContent = errorMsg;
                }

                break

            default:
                showError(emailInput, emailError, 'Error inesperado. Intenta nuevamente.')
                if(errorAnnouncement) {
                    errorAnnouncement.textContent = 'Error inesperado. Intenta nuevamente.';
                }
        }
    }

    function checkExistingSession() {
        const token = localStorage.getItem('authToken');
        if (token) {
            window.location.href = '/dashboard';
        }
    }

    checkExistingSession();
})