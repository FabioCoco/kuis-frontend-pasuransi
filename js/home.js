document.addEventListener('DOMContentLoaded', function() {
    const navLinksContainer = document.getElementById('navLinks');
    
    // Ambil tombol-tombol baru dari HTML
    const healthBtn = document.getElementById('healthBtn');
    const carBtn = document.getElementById('carBtn');
    const lifeBtn = document.getElementById('lifeBtn');

    // Cek status login
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    // 1. Logika untuk menampilkan Navbar
    if (loggedInUser) {
        navLinksContainer.innerHTML = `
            <span>Halo, <strong>${loggedInUser.fullName.split(' ')[0]}</strong>!</span>
            <a href="/pages/home.html">Home</a>
            <a href="/pages/histori/histori.html">Histori</a>
            <button id="logoutBtn" class="btn-logout">Logout</button>
        `;
        document.getElementById('logoutBtn').addEventListener('click', function() {
            sessionStorage.removeItem('loggedInUser');
            window.location.href = '/pages/login.html';
        });
    } else {
        navLinksContainer.innerHTML = `
            <a href="/pages/login.html">Login</a>
            <a href="/pages/register.html" class="btn-nav">Daftar</a>
        `;
    }

    // 2. Fungsi umum untuk menangani klik tombol produk
    function handleProductClick(pageUrl) {
        if (loggedInUser) {
            window.location.href = pageUrl;
        } else {
            // Jika belum login, langsung arahkan ke halaman login
            window.location.href = '/pages/login.html';
        }
    }

    // 3. Tambahkan event listener untuk setiap tombol
    healthBtn.addEventListener('click', function() {
        handleProductClick('/pages/detail/detail-kesehatan.html');
    });

    carBtn.addEventListener('click', function() {
        handleProductClick('/pages/detail/detail-mobil.html');
    });

    lifeBtn.addEventListener('click', function() {
        handleProductClick('/pages/detail/detail-jiwa.html');
    });
});

