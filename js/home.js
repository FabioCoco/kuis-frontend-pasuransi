document.addEventListener('DOMContentLoaded', function() {
    const navLinksContainer = document.getElementById('navLinks');
    const productGrid = document.getElementById('product-grid');

    // Cek status login dari sessionStorage
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        // Tampilan jika pengguna sudah login
        navLinksContainer.innerHTML = `
            <span>Halo, <strong>${loggedInUser.fullName.split(' ')[0]}</strong>!</span>
            <a href="/pages/home.html">Home</a>
            <a href="/pages/histori/histori.html">Histori</a>
            <button id="logoutBtn" class="btn-logout">Logout</button>
        `;
        const logoutBtn = document.getElementById('logoutBtn');
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('loggedInUser');
            window.location.href = '/pages/login.html';
        });
    } else {
        navLinksContainer.innerHTML = `
            <a href="/pages/login.html">Login</a>
            <a href="/pages/register.html" class="btn-nav">Daftar</a>
        `;
    }

    const products = [
        {
            title: 'Asuransi Kesehatan',
            description: 'Perlindungan menyeluruh untuk kesehatan Anda dan keluarga.',
            iconClass: 'fa-heart-pulse',
            link: 'detail-kesehatan.html'
        },
        {
            title: 'Asuransi Mobil',
            description: 'Jaminan perlindungan untuk mobil Anda dari berbagai risiko.',
            iconClass: 'fa-car-burst',
            link: 'detail-mobil.html'
        },
        {
            title: 'Asuransi Jiwa',
            description: 'Berikan kepastian finansial bagi orang-orang terkasih.',
            iconClass: 'fa-shield-heart',
            link: 'detail-jiwa.html'
        }
    ];

    products.forEach(product => {
        const card = document.createElement('div'); 
        card.className = 'product-card';
        card.innerHTML = `
            <div class="card-icon-wrapper">
                <i class="fas ${product.iconClass}"></i>
            </div>
            <div class="card-content">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
            </div>
            <button class="card-button">Lihat Detail</button>
        `;

        card.addEventListener('click', function() {
            if (loggedInUser) {
                window.location.href = `/pages/detail/${product.link}`;
            } else {
                window.location.href = '/pages/login.html';
            }
        });

        productGrid.appendChild(card);
    });
});