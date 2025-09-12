document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('register-form');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordError = document.getElementById('password-error');
    const confirmPassError = document.getElementById('confirm-pass-error');
    const signinButton = document.getElementById('signin-button');
    const spinner = document.getElementById('spinner');

    const toast = document.getElementById('toast');
    if(!toast){
        toast = document.createElement('div');
        toast.className='toast';
        toast.id = 'toast';
        toast.textContent = 'Registro exitoso';
        document.body.appendChild(toast);
    }

    const API_BASE_URL = '';
    const REGISTER_URL=`${API_BASE_URL}/api/create-user`;

    passwordInput.addEventListener('input', validatePassword);

    confirmPasswordInput.addEventListener('input', validateConfirmPassword);

    form.addEventListener('input', validateForm);

    form.addEventListener('submit', handleSubmit);

    function validatePassword() {
        const password = passwordInput.value;
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (password && !regex.test(password)) {
            passwordError.style.display = 'block';
            return false;
        }
        else {
            passwordError.style.display = 'none';
            return true;
        }
    }

    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if ( confirmPassword && password !== confirmPassword ) {
            confirmPassError.style.display='block';
            return false;
        }
        else {
            confirmPassError.style.display= 'none';
            return true;
        }
    }

    function validateForm() {
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const allFieldsFilled = Array.from(form.elements).every(input => {
            if (input.tagName === 'INPUT') {
                return input.value.trim() !== '';
            }
            return true;
        });

        signinButton.disabled= ! (allFieldsFilled && isPasswordValid && isConfirmPasswordValid);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        spinner.style.display = 'block';
        signinButton.disabled = true;

        const formData = {
            name: document.getElementById('name').value,
            lastName: document.getElementById('last-name').value,
            age: document.getElementById('age').value,
            email: document.getElementById('email').value,
            password: passwordInput.value
        };

        const spinner = document.getElementById('spinner');
        spinner.style.display = 'block';

        try {
            const response = await fetch(REGISTER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            spinner.style.display = 'none';

            if (response.ok) {
                toast.textContent = 'Registro exitoso';
                toast.className = 'toast show';

                setTimeout(function() {
                    toast.className = toast.className.replace('show', '');

                    window.location.href = '../login/login.html';
                }, 3000);

                form.reset();

            } else {
                alert(data.message || 'Error en el registro');
                signinButton.disabled = false;
            }
        
        }
        catch (error) {
            spinner.style.display = 'none';
            signinButton.disabled = false;
            
            console.error('Error:', error);
            alert('Error de conexión con el servidor');
        }
    }

    const passwordFields = document.querySelectorAll('input[type="password"]');
    passwordFields.forEach(field => {
        const toggle = document.createElement('span');
        toggle.className = 'toggle-password';
        toggle.innerHTML = '<i class="far fa-eye"></i>';
        toggle.style.cursor = 'pointer';
        toggle.style.position = 'absolute';
        toggle.style.right = '12px';
        toggle.style.top = '50%';
        toggle.style.transform = 'translateY(-50%)';
        toggle.style.color = '#777';
        
        field.parentNode.style.position = 'relative';
        field.parentNode.appendChild(toggle);
        
        toggle.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (field.type === 'password') {
                field.type = 'text';
                icon.className = 'far fa-eye-slash';
            } else {
                field.type = 'password';
                icon.className = 'far fa-eye';
            }
        });
    });
})