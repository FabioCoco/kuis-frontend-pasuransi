document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const messageDiv = document.getElementById('message');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        messageDiv.textContent = '';
        messageDiv.className = 'message';
        
        // Semua field harus diisi
        if (!fullName || !email || !phone || !password || !confirmPassword) {
            showMessage('Semua kolom harus diisi.', 'error');
            return;
        }

        // Email harus valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Format email tidak valid.', 'error');
            return;
        }

        //  Kata sandi minimal 8 karakter
        if (password.length < 8) {
            showMessage('Kata sandi minimal harus 8 karakter.', 'error');
            return;
        }

        //  Kata sandi dan konfirmasi harus sesuai
        if (password !== confirmPassword) {
            showMessage('Kata sandi dan konfirmasi kata sandi tidak cocok.', 'error');
            return;
        }

        //  Nama lengkap (3-32 karakter, tanpa angka)
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (fullName.length < 3 || fullName.length > 32 || !nameRegex.test(fullName)) {
            showMessage('Nama lengkap harus 3-32 karakter dan tidak boleh mengandung angka.', 'error');
            return;
        }
        
        //  Nomor handphone (awal 08, hanya angka, 10-16 digit)
        const phoneRegex = /^08[0-9]{8,14}$/;
        if (!phoneRegex.test(phone)) {
            showMessage('Format nomor handphone tidak valid (contoh: 081234567890).', 'error');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Cek apakah email sudah terdaftar
        if (users.some(user => user.email === email)) {
            showMessage('Email ini sudah terdaftar. Silakan gunakan email lain.', 'error');
            return;
        }

        const newUser = { fullName, email, phone, password };
        users.push(newUser);

        localStorage.setItem('users', JSON.stringify(users));


        showMessage('Pendaftaran berhasil! Silakan login.', 'success');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);

    });
    
    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.classList.add(type);
    }
});