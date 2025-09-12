document.addEventListener('DOMContentLoaded', function(){

    const API_BASE_URL = '';

    document.getElementById('register-form'.addEventListener('submit', async function(e) {
        e.preventDefault();

        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return
        }

        const userData = {
            name: document.getElementById('name').value,
            lastname: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
            age: document.getElementById('age').value,
            password: password
        };

        const spinner = document.getElementById('spinner');
        spinner.style.display = 'block';

        try {

            const response = await fetch (`${API_BASE_URL}/`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            spinner.style.display = 'none';

            if (response.ok) {
                const toast = document.getElementById('toast');
                toast.textContent = 'Registro exitoso';
                toast.className = 'toast show';

                setTimeout(function(){
                    toast.className = toast.className.replace('show', '');
                    window.location.href = 'login.html';
                }, 3000);

                document.getElementById('register-form').reset();
            }

            else{
                alert(data.message || 'Error en el registro');
            }
        }

        catch(error) {
            spinner.style.display= 'none';

            console.error('Error:', error);
            alert('Error de conexión con el servidor');
        }
    }));
})