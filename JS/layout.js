     document.addEventListener('DOMContentLoaded', () => {
    // 1. KOMPONEN HEADER / NAVBAR
    const headerEl = document.getElementById('header-component');
    if (headerEl) {
        headerEl.innerHTML = `
    <header>
        <nav id="navbar" class="fixed top-0 left-0 z-50 w-full bg-white border-b border-gray-200 transition-all duration-300">
            <div class="container-custom px-4 md:px-6 lg:px-8 mx-auto max-w-7xl">
                <div class="h-16 flex items-center justify-between">
                    <a href="index.html" class="flex items-center gap-3 cursor-pointer hover:opacity-80 transition">
                        <img id="logoImage"  src="./assets/Icons/logoblue.png" alt="logo" class="w-10 h-10 object-contain">
                        <h1 id="logoText" class="text-xl font-bold text-gray-900">Berita Terkini</h1>
                    </a>

                   <ul id="nav-categories" class="hidden lg:flex items-center gap-8 text-sm">
                        <li><a href="#" data-url="https://berita-indo-api-next.vercel.app/api/antara-news/terkini" class="nav-link text-blue-500 font-medium active-category">Beranda</a></li>
                        <li><a href="#" data-url="https://berita-indo-api-next.vercel.app/api/antara-news/terkini" class="nav-link text-gray-500 hover:text-blue-500 transition">Terbaru</a></li>
                        <li><a href="#" data-url="https://berita-indo-api-next.vercel.app/api/antara-news/hiburan" class="nav-link text-gray-500 hover:text-blue-500 transition">Hiburan</a></li>
                        <li><a href="#" data-url="https://berita-indo-api-next.vercel.app/api/antara-news/lifestyle" class="nav-link text-gray-500 hover:text-blue-500 transition">Gaya Hidup</a></li>
                        <li><a href="#" data-url="https://berita-indo-api-next.vercel.app/api/antara-news/olahraga" class="nav-link text-gray-500 hover:text-blue-500 transition">Olahraga</a></li>
                        <li><a href="#" data-url="https://berita-indo-api-next.vercel.app/api/cnn-news/nasional" class="nav-link text-gray-500 hover:text-blue-500 transition">Nasional</a></li>
                        <li><a href="#" data-url="https://berita-indo-api-next.vercel.app/api/cnn-news/internasional" class="nav-link text-gray-500 hover:text-blue-500 transition">Internasional</a></li>
                    </ul>

                    <button id="mobileMenuBtn" class="block lg:hidden text-gray-700 hover:text-blue-500 transition">
                        <i class="fa-solid fa-bars text-2xl"></i>
                    </button>
                </div>
            </div>
            <div
    id="mobileMenu"
    class="lg:hidden max-h-0 overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-gray-200"
>
    <ul class="flex flex-col py-4">

        <li>
            <a href="#"
               data-url="https://berita-indo-api-next.vercel.app/api/antara-news/terkini"
               class="block px-4 py-3 nav-link text-blue-500 font-medium">
               Beranda
            </a>
        </li>

        <li>
            <a href="#"
               data-url="https://berita-indo-api-next.vercel.app/api/antara-news/terkini"
               class="block px-4 py-3 nav-link text-gray-500">
               Terbaru
            </a>
        </li>

        <li>
            <a href="#"
               data-url="https://berita-indo-api-next.vercel.app/api/antara-news/hiburan"
               class="block px-4 py-3 nav-link text-gray-500">
               Hiburan
            </a>
        </li>

        <li>
            <a href="#"
               data-url="https://berita-indo-api-next.vercel.app/api/antara-news/lifestyle"
               class="block px-4 py-3 nav-link text-gray-500">
               Gaya Hidup
            </a>
        </li>

        <li>
            <a href="#"
               data-url="https://berita-indo-api-next.vercel.app/api/antara-news/olahraga"
               class="block px-4 py-3 nav-link text-gray-500">
               Olahraga
            </a>
        </li>

        <li>
            <a href="#"
               data-url="https://berita-indo-api-next.vercel.app/api/cnn-news/nasional"
               class="block px-4 py-3 nav-link text-gray-500">
               Nasional
            </a>
        </li>

        <li>
            <a href="#"
               data-url="https://berita-indo-api-next.vercel.app/api/cnn-news/internasional"
               class="block px-4 py-3 nav-link text-gray-500">
               Internasional
            </a>
        </li>

    </ul>
</div>
        </nav>
    </header>
    `;
       const mobileBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        if (mobileBtn && mobileMenu) {

            const icon = mobileBtn.querySelector('i');

            mobileBtn.addEventListener('click', () => {

                mobileMenu.classList.toggle('max-h-0');
                mobileMenu.classList.toggle('max-h-[500px]');

                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            });

            // Tutup ketika user scroll
            window.addEventListener('scroll', () => {

                mobileMenu.classList.remove('max-h-[500px]');
                mobileMenu.classList.add('max-h-0');

                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');

            });

        }
    }



// 2. KOMPONEN FOOTER
    const footerEl = document.getElementById('footer-component');
    if (footerEl) {
        footerEl.innerHTML = `
    <footer class="bg-[#2D4059] mt-16">
        <div class="container-custom px-4 md:px-8 mx-auto max-w-7xl py-8">
            <div class="flex flex-col lg:flex-row justify-between gap-12">
                <div class="w-full lg:max-w-sm">
                    <div hre class="flex items-center gap-3 mb-6">
                        <img src="./assets/Icons/Logo.png" alt="Logo Berita Kini" class="w-12 h-12 object-contain">
                        <h3 class="text-3xl font-bold text-white">Berita Kini</h3>
                    </div>
                    <p class="text-white/70 text-sm mb-8">© 2026 Berita Kini. All Rights Reserved.</p>
                    <h4 class="text-white font-medium mb-4">Ikuti Kami</h4>
                    <div class="flex gap-4">
                        <a href="#" class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#E5E7EB] flex items-center justify-center text-[#2D4059] hover:scale-105 transition">
                            <i class="fa-brands fa-youtube text-3xl"></i>
                        </a>
                        <a href="#" class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#E5E7EB] flex items-center justify-center text-[#2D4059] hover:scale-105 transition">
                            <i class="fa-brands fa-instagram text-3xl"></i>
                        </a>
                        <a href="#" class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#E5E7EB] flex items-center justify-center text-[#2D4059] hover:scale-105 transition">
                            <i class="fa-brands fa-facebook text-3xl"></i>
                        </a>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row gap-10 lg:gap-16 w-full lg:w-auto">
                    <div class="min-w-fit">
                        <h4 class="text-white text-xl font-semibold mb-4">Telusuri</h4>
                        <ul class="space-y-2 text-white/70">
                            <li><a href="#" data-url="https://berita-indo-api-next.vercel.app/api/antara-news/terkini" class="hover:text-white transition">Beranda</a></li>
                            <li><a href="#" data-url="https://berita-indo-api-next.vercel.app/api/antara-news/lifestyle" class="hover:text-white transition">Kesehatan</a></li>
                            <li><a href="#" data-url="https://berita-indo-api-next.vercel.app/api/antara-news/otomotif" class="hover:text-white transition">Otomotif</a></li>
                            <li><a href="#" data-url="https://berita-indo-api-next.vercel.app/api/antara-news/politik" class="hover:text-white transition">Politik</a></li>
                            <li><a href="#" data-url="https://berita-indo-api-next.vercel.app/api/antara-news/olahraga" class="hover:text-white transition">Olahraga</a></li>
                            <li><a href="#" data-url="https://berita-indo-api-next.vercel.app/api/cnn-news/nasional" class="hover:text-white transition">Nasional</a></li>
                            <li><a href="#" data-url="https://berita-indo-api-next.vercel.app/api/cnn-news/internasional" class="hover:text-white transition">Internasional</a></li>
                        </ul>
                    </div>
                    <div class="min-w-fit">
                        <h4 class="text-white text-xl font-semibold mb-4">Bantuan</h4>
                        <ul class="space-y-2 text-white/70">
                            <li><a href="#" class="hover:text-white transition">Kontak Kami</a></li>
                            <li><a href="#" class="hover:text-white transition">Laporan Pembajakan</a></li>
                            <li><a href="#" class="hover:text-white transition">Kebijakan</a></li>
                        </ul>
                    </div>
                    <div class="w-full sm:max-w-xs">
                        <h4 class="text-white text-xl font-semibold mb-6">Berlangganan Berita Terbaru</h4>
                        <div class="flex bg-white rounded-lg overflow-hidden">
                            <input type="email" placeholder="Masukan email" class="flex-1 px-4 py-3 outline-none text-gray-700 w-full">
                            <button class="bg-blue-500 px-5 text-white hover:bg-blue-600 transition"><img src="./assets/icons/pesawat.svg" alt="Send" class="w-6 h-6"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    `;
    }
});
