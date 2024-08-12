// Simulación de autenticación básica
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin123') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        showTab('contactos');
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

// Cambiar entre pestañas
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    document.getElementById(tabName).classList.add('active');
}

// Almacenar contactos en memoria local (localStorage)
let contactos = JSON.parse(localStorage.getItem('contactos')) || [];

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nuevoContacto = {
        nombre: document.getElementById('nombre').value,
        telefono: document.getElementById('telefono').value,
        direccion: document.getElementById('direccion').value,
        email: document.getElementById('email').value,
        fechaAlta: document.getElementById('fechaAlta').value,
        numPoliza: document.getElementById('numPoliza').value,
        dni: document.getElementById('dni').value,
        rama: document.getElementById('rama').value,
        compania: document.getElementById('compania').value,
        vencPoliza: document.getElementById('vencPoliza').value,
        vencCuponera: document.getElementById('vencCuponera').value,
        formaPago: document.getElementById('formaPago').value,
        patente: document.getElementById('patente').value,
        tipoVehiculo: document.getElementById('tipoVehiculo').value
    };

    contactos.push(nuevoContacto);
    localStorage.setItem('contactos', JSON.stringify(contactos));

    mostrarContactos();
    mostrarNotificaciones();
    document.getElementById('contactForm').reset();
});

// Mostrar contactos almacenados
function mostrarContactos() {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';

    contactos.forEach((contacto, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${contacto.nombre}</strong><br>
            Teléfono: ${contacto.telefono}<br>
            Dirección: ${contacto.direccion}<br>
            Email: ${contacto.email}<br>
            Número de Póliza: ${contacto.numPoliza}<br>
            Vencimiento de Póliza: ${contacto.vencPoliza}<br>
            <button onclick="eliminarContacto(${index})">Eliminar</button>
        `;
        contactList.appendChild(li);
    });
}

// Mostrar notificaciones
function mostrarNotificaciones() {
    const notificationList = document.getElementById('notificationList');
    notificationList.innerHTML = '';

    const hoy = new Date();
    contactos.forEach(contacto => {
        const vencimiento = new Date(contacto.vencPoliza);
        const diffTime = vencimiento - hoy;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        if (diffDays > 0 && diffDays <= 7) {
            const li = document.createElement('li');
            li.innerHTML = `
                La póliza de <strong>${contacto.nombre}</strong> vence en <strong>${diffDays}</strong> días.
            `;
            notificationList.appendChild(li);
        }
    });
}

// Eliminar un contacto
function eliminarContacto(index) {
    contactos.splice(index, 1);
    localStorage.setItem('contactos', JSON.stringify(contactos));
    mostrarContactos();
    mostrarNotificaciones();
}

// Verificación diaria de notificaciones
setInterval(mostrarNotificaciones, 0 * 0 * 60 * 1000);

mostrarContactos();
mostrarNotificaciones();
