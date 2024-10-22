window.addEventListener('load', function() {
    // Referenciar elementos de la página
    const msgSuccess = document.getElementById('msgSuccess');
    const logoutLink = document.getElementById('logoutLink');

    // Recuperar información del usuario del localStorage
    const result = JSON.parse(localStorage.getItem('result'));
    
    if (result && result.nombreUsuario) {
        mostrarAlerta(`Bienvenido ${result.nombreUsuario}`);
    }

    //click cerrar sesion
    if (logoutLink) {
        logoutLink.addEventListener('click', async (event) => {
            event.preventDefault();

            const tipoDocumento = result.tipoDocumento;
            const numeroDocumento = result.numeroDocumento;

            console.log("Tipo Documento:", tipoDocumento);
            console.log("Número Documento:", numeroDocumento);

            window.location.href = '/login';
            
            try {
                const response = await fetch('http://localhost:8082/login/cerrarSesion', { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ tipoDocumento, numeroDocumento })
                });

                if (response.ok) {
                    localStorage.setItem('successMessage', 'Sesión registrada');
                    localStorage.removeItem('result');
                    window.location.href = '/login';
                } else {
                    mostrarAlerta('Error al cerrar sesión, intenta nuevamente.');
                }
            } catch (error) {
                mostrarAlerta('Error en la conexión, intenta nuevamente.');
            }
        });
    }
});


function mostrarAlerta(mensaje) {
    const msgSuccess = document.getElementById('msgSuccess');
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'block';
}

function ocultarAlerta() {
    const msgSuccess = document.getElementById('msgSuccess');
    msgSuccess.innerHTML = '';
    msgSuccess.style.display = 'none';
}
