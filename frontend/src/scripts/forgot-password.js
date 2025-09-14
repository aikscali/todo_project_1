require("dotenv").config;

document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('forgot-password-form');
    const submitButton = document.getElementById('submit');
    const spinner = document.getElementById('spinner');
    const toast = document.getElementById('toast');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;

        if(!isValidEmail(email)){
            showToast('Por favor, ingresa un email válido', true);
            return;
        }

        spinner.style.display = 'block';
        submitButton.disabled = true;

        try {
            const response = await fetch('http://localhost:8080/api/passwprd-reset/generate-link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/js'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            spinner.style.display = 'none';
            submitButton.disabled = false;

            if (response.ok) {
                showToast('Se ha enviado un enlace de recuperación a tu email');

                form.reset();
            }

            else {
                showToast(data.message || 'Error al enviar el enlace de recuperación', true);
            }
            
        }
        catch (error){
            spinner.style.display = 'none';
            submitButton.disabled = false;

            console.error('Error', error);
            showToast('Error de conexión con el servidor', true);
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showToast(message, isError = false) {
        toast.textContent = message;
        toast.className = isError ? 'toast error show' : 'toast show';

        setTimeout(()=>{
            toast.className = toast.className.replace('show', '');
        }, 3000);
    }
});