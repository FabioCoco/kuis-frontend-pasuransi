document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        messageDiv.textContent = '';
        messageDiv.className = 'message';

        // Semua field harus diisi
        if (email === '' || password === '') {
            showMessage('Email dan kata sandi harus diisi.', 'error');
            return;
        }

        // Email harus valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Format email tidak valid.', 'error');
            return;
        }
        
        if (email === 'user@example.com' && password === 'password123') {
            showMessage('Login berhasil! Mengarahkan ke halaman utama...', 'success');
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 2000);
        } else {
            showMessage('Email atau kata sandi salah.', 'error');
        }

        // Ambil data semua pengguna dari localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const foundUser = users.find(user => user.email === email && user.password === password);

        if (foundUser) {
            showMessage('Login berhasil! Mengarahkan ke halaman utama...', 'success');
            sessionStorage.setItem('loggedInUser', JSON.stringify(foundUser));
            
            // Mengarahkan ke halaman utama setelah beberapa saat
            setTimeout(() => {
                 window.location.href = 'home.html';
            }, 2000);
        } else {
            showMessage('Email atau kata sandi salah.', 'error');
        }
    });

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.classList.add(type);
    }
});