// const navbar = document.getElementById("navbar");
// const logoText = document.getElementById("logoText");
// const logoImage = document.getElementById("logoImage");
// const navLinks = document.querySelectorAll(".nav-link");

// window.addEventListener("scroll", () => {

//     const navbar = document.getElementById("navbar");
//     const logoText = document.getElementById("logoText");
//     const logoImage = document.getElementById("logoImage");
//     const navLinks = document.querySelectorAll(".nav-link");

//     if (!navbar) return;

//     if (window.scrollY > 50) {

//         navbar.classList.remove(
//             "bg-white",
//             "border-gray-200"
//         );

//         navbar.classList.add(
//             "bg-[#0090FF]"
//         );

//         logoImage.src = "./assets/Icons/logo.png";

//         logoText.classList.remove("text-gray-900");
//         logoText.classList.add("text-white");

//         navLinks.forEach(link => {

//             link.classList.remove(
//                 "text-gray-500",
//                 "text-blue-500"
//             );

//             link.classList.add("text-white");

//         });

//     } else {

//         navbar.classList.remove(
//             "bg-[#0090FF]"
//         );

//         navbar.classList.add(
//             "bg-white",
//             "border-gray-200"
//         );

//         logoImage.src = "./assets/Icons/logoblue.png";

//         logoText.classList.remove("text-white");
//         logoText.classList.add("text-gray-900");

//         navLinks.forEach(link => {

//             link.classList.remove("text-white");
//             link.classList.add("text-gray-500");

//         });

//         // menu Beranda tetap biru
//         const activeLink = document.querySelector('.active-category');

//         if (activeLink) {
//             activeLink.classList.remove('text-gray-500');
//             activeLink.classList.add('text-blue-500');
//         }
//     }
// });

window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    const logoText = document.getElementById("logoText");
    const logoImage = document.getElementById("logoImage");
    
    // 1. Ubah target HANYA untuk nav-link di Desktop (Laptop) agar menu HP tidak ikut memutih
    const navLinks = document.querySelectorAll("#nav-categories .nav-link");
    // 2. Ambil elemen tombol ikon garis tiga (HP)
    const mobileBtn = document.getElementById("mobileMenuBtn");

    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.remove("bg-white", "border-gray-200");
        navbar.classList.add("bg-[#0090FF]");
        
        logoImage.src = "./assets/Icons/logoputih.png";
        logoText.classList.remove("text-gray-900");
        logoText.classList.add("text-white");

        // 3. Ubah Ikon Hamburger HP jadi Putih
        if (mobileBtn) {
            mobileBtn.classList.remove("text-gray-700");
            mobileBtn.classList.add("text-white");
        }

        navLinks.forEach(link => {
            link.classList.remove("text-gray-500", "text-blue-500");
            link.classList.add("text-white");
        });

    } else {
        navbar.classList.remove("bg-[#0090FF]");
        navbar.classList.add("bg-white", "border-gray-200");
        
        logoImage.src = "./assets/Icons/logoblue.png";
        logoText.classList.remove("text-white");
        logoText.classList.add("text-gray-900");

        // 4. Kembalikan Ikon Hamburger HP jadi Abu-abu
        if (mobileBtn) {
            mobileBtn.classList.remove("text-white");
            mobileBtn.classList.add("text-gray-700");
        }

        navLinks.forEach(link => {
            link.classList.remove("text-white");
            if (!link.classList.contains('text-blue-500')) {
                link.classList.add("text-gray-500");
            }
        });

        // Kembalikan highlight biru pada menu desktop yang aktif
        const activeLink = document.querySelector('#nav-categories .active-category');
        if (activeLink) {
            activeLink.classList.remove('text-gray-500');
            activeLink.classList.add('text-blue-500');
        }
    }
});

    function formatDate(dateString) {
        if (!dateString) return 'Baru saja';
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    }

    function getImageUrl(article){
        if (typeof article.image === 'string') {
            return article.image;
        }

        if (article.image && typeof article.image === 'object'){
            return article.image.large || article.image.small || article.thumbnail;
        }
        return article.thumbnail || 'https://via.placeholder.com/400x250?text=No+Image'
    }

document.addEventListener('DOMContentLoaded', () => {
    const headlineContainer = document.getElementById('headline-container');
    const popularContainer = document.getElementById('popular-container');
    const recommendationContainer = document.getElementById('recommendation-container');
    const navLinks = document.querySelectorAll('a[data-url]');



    function showLoading() {
        const loadingHTML = '<div class="col-span-full py-10 text-center"><p class="text-gray-500 animate-pulse font-medium"><i class="fa-solid fa-spinner fa-spin mr-2"></i> Memuat Data...</p></div>';
        headlineContainer.innerHTML = loadingHTML;
        popularContainer.innerHTML = loadingHTML;
        recommendationContainer.innerHTML = loadingHTML;
    }



    
    // Tambahkan daftar API ini tepat di bawah variabel navLinks
    const apiEndpoints = {
        'Terbaru': 'https://berita-indo-api-next.vercel.app/api/antara-news/terkini',
        'Hiburan': 'https://berita-indo-api-next.vercel.app/api/antara-news/hiburan',
        'Gaya Hidup': 'https://berita-indo-api-next.vercel.app/api/antara-news/lifestyle',
        'Olahraga': 'https://berita-indo-api-next.vercel.app/api/antara-news/olahraga',
        'Nasional': 'https://berita-indo-api-next.vercel.app/api/cnn-news/nasional',
        'Internasional': 'https://berita-indo-api-next.vercel.app/api/cnn-news/internasional'
    };

    async function fetchNews(url, categoryName) {
        showLoading(); 

        const breadcrumbContainer = document.getElementById('breadcrumb-container');
        const breadcrumbCategory = document.getElementById('breadcrumb-category');

        if(breadcrumbContainer && breadcrumbCategory){
            if (categoryName.toLowerCase() === 'beranda'){
                breadcrumbContainer.classList.add('hidden');
            } else {
                breadcrumbContainer.classList.remove('hidden');
                breadcrumbCategory.textContent = categoryName;
            }
        }

        try {
            let articles = [];

            // Cek apakah menu yang diklik adalah "Beranda"
            if (categoryName.toLowerCase() === 'beranda') {
                
                // Fetch SEMUA API secara bersamaan
                const fetchPromises = Object.entries(apiEndpoints).map(async ([catName, apiUrl]) => {
                    try {
                        const res = await fetch(apiUrl);
                        const result = await res.json();
                        let data = [];
                        if (result.data && Array.isArray(result.data.posts)) data = result.data.posts;
                        else if (Array.isArray(result.data)) data = result.data;
                        
                        // Sisipkan nama kategori asli ke dalam data setiap berita
                        return data.map(item => ({ ...item, customCategory: catName }));
                    } catch (e) {
                        return []; // Jika 1 API gagal, abaikan dan lanjut ke API lain
                    }
                });

                // Tunggu semua proses selesai, lalu gabungkan jadi 1 array panjang
                const results = await Promise.all(fetchPromises);
                articles = results.flat();

                // Fungsi untuk mengacak urutan Array (Fisher-Yates Shuffle)
                for (let i = articles.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [articles[i], articles[j]] = [articles[j], articles[i]];
                }

            } else {
                // Fetch normal jika menu lain yang diklik (misal: Olahraga saja)
                const response = await fetch(url);
                const result = await response.json();
                
                if (result.data && Array.isArray(result.data.posts)) articles = result.data.posts;
                else if (Array.isArray(result.data)) articles = result.data;

                // Sisipkan nama kategori yang dipilih
                articles = articles.map(item => ({ ...item, customCategory: categoryName }));
            }

            if (articles.length === 0) throw new Error("Data berita kosong");

            renderNews(articles, categoryName);
        } catch (error) {
            console.error('Error fetching data:', error);
            const errorHTML = '<div class="col-span-full py-10 text-center text-red-500 font-medium">Gagal memuat berita. Periksa koneksi internet Anda.</div>';
            headlineContainer.innerHTML = errorHTML;
            popularContainer.innerHTML = errorHTML;
            recommendationContainer.innerHTML = errorHTML;
        }
    }



    function renderNews(articles, categoryName) {
        // Render Headline
        // const headline = articles[0];
        // const encodedHeadline = encodeURIComponent(JSON.stringify(headline));
        // const headlineCategory = headline.customCategory || categoryName;
        window.headlineArticles = articles.slice(0, 5); // Ambil 5 berita teratas khusus untuk Slider Headline
        window.currentHeadlineIndex = 0;
        window.headlineCategoryName = categoryName;

        // Panggil mesin cetak Headline
        if (typeof window.renderHeadline === 'function') {
            window.renderHeadline();
        }
        // headlineContainer.innerHTML = `
        //  <div>
        //         <p class="text-sm text-gray-500 font-medium mb-4">Headline</p>
        //         <h1 class="text-2xl md:text-3xl lg:text-[32px] font-bold text-gray-900 leading-tight mb-4 md:mb-6 hover:text-blue-500 transition cursor-pointer" onclick="goToDetail('${encodedHeadline}', '${headlineCategory}')">
        //             ${headline.title}
        //         </h1>
        //         <p class="text-gray-500 leading-7 mb-5 line-clamp-3">
        //             ${headline.description || 'Simak berita selengkapnya dengan mengklik tautan di bawah ini.'}
        //         </p>
        //         <p class="text-sm text-gray-400 mb-8">${formatDate(headline.isoDate || headline.pubDate)}</p>
        //         <span onclick="goToDetail('${encodedHeadline}', '${headlineCategory}')" class="text-blue-500 font-medium hover:underline cursor-pointer">Baca Selengkapnya....</span>
        //     </div>
        //     <div>
        //         <div onclick="goToDetail('${encodedHeadline}', '${headlineCategory}')" class="cursor-pointer">
        //             <img src="${getImageUrl(headline)}" alt="Headline" class="w-full h-56 sm:h-64 md:h-72 lg:h-[360px] object-cover rounded-2xl shadow-md hover:opacity-90 transition">
        //         </div>
        //     </div>
        // `;

        // Render Populer
        const popular = articles.slice(1, 4);
        popularContainer.innerHTML = popular.map((article, index) => {
            let borderClass = index > 0 ? "lg:border-l border-t lg:border-t-0 border-gray-200" : "";
            let padClass = index === 0 ? "lg:pr-6 pb-6 lg:pb-0" : index === 1 ? "lg:px-6 py-6 lg:py-0" : "lg:pl-6 pt-6 lg:pt-0";

            // Tambahkan variabel ini untuk encode data berita ke detail
            const encodedArticle = encodeURIComponent(JSON.stringify(article));
            const cat = article.customCategory || categoryName;

            return `
           <div class="flex gap-4 ${padClass} ${borderClass}">
                <div class="relative shrink-0 mt-2 ml-2">
                    <div class="absolute -top-3 -left-3 w-8 h-8 bg-[#212E40] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md z-10">${index + 1}</div>
                    <img src="${getImageUrl(article)}" alt="News" class="w-28 sm:w-32 h-24 sm:h-28 object-cover rounded-xl shadow-sm cursor-pointer hover:opacity-90 transition" onclick="goToDetail('${encodedArticle}', '${cat}')">
                </div>
                <div class="flex flex-col justify-start">
                    <h3 class="font-bold text-gray-800 text-sm sm:text-base leading-snug line-clamp-3 hover:text-blue-500 transition cursor-pointer" onclick="goToDetail('${encodedArticle}', '${cat}')">
                        ${article.title}
                    </h3>
                    <div class="flex items-center gap-2 text-xs mt-3">
                        <span class="text-blue-500 font-semibold uppercase">${cat}</span>
                        <span class="text-gray-300 text-[8px]"><i class="fa-solid fa-circle"></i></span>
                        <span class="text-gray-500">${formatDate(article.isoDate || article.pubDate)}</span>
                    </div>
                </div>
            </div>
            `;
        }).join('');



    // Render Rekomendasi (Persiapan Pagination)
        window.recArticles = articles.slice(4); // Simpan semua sisa artikel mentah ke memori
        window.currentRecPage = 1; // Atur halaman aktif ke halaman 1
        window.recItemsPerPage = 8; // Tampilkan 8 berita saja per halaman
        window.currentCategoryName = categoryName;

        // Panggil sistem pembuat halaman dan tombol klik
        if (typeof window.renderRecommendations === 'function') {
            window.renderRecommendations();
        }
    
    }

    
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a[data-url]'); // Deteksi apakah yang diklik adalah link kategori
        if (link) {
            e.preventDefault();
            const categoryName = link.textContent.trim();
            const apiUrl = link.getAttribute('data-url');

            if (window.location.pathname.includes('detail.html')){
                window.location.href = `index.html?targetCategory=${encodeURIComponent(categoryName)}&targetUrl=${encodeURIComponent(apiUrl)}`;
                return;
            }


            const allNavLinks = document.querySelectorAll('a[data-url]');
            allNavLinks.forEach(nav => {
                nav.classList.remove('text-blue-500', 'font-medium', 'active-category');
                nav.classList.add('text-gray-500');
            });
            link.classList.remove('text-gray-500');
            link.classList.add('text-blue-500', 'font-medium', 'active-category');
            fetchNews(link.getAttribute('data-url'), link.textContent.trim());
        }
    });

    // Panggil data pertama kali halaman dimuat
    const urlParams = new URLSearchParams(window.location.search);
    const targetCategory = urlParams.get('targetCategory');
    const targetUrl = urlParams.get('targetUrl');

    if (targetCategory && targetUrl) {
        // Jika index dibuka karena diklik dari halaman detail berita
        fetchNews(targetUrl, targetCategory);
        
        // Menyesuaikan perubahan warna text aktif di navbar
        setTimeout(() => {
            document.querySelectorAll('a[data-url]').forEach(nav => {
                if (nav.textContent.trim().toLowerCase() === targetCategory.toLowerCase()) {
                    nav.classList.remove('text-gray-500');
                    nav.classList.add('text-blue-500', 'font-medium');
                } else {
                    nav.classList.remove('text-blue-500', 'font-medium', 'active-category');
                    nav.classList.add('text-gray-500');
                }
            });
        }, 300);
    } else {
        // Jika dibuka secara normal, jalankan Beranda default
        fetchNews('', 'Beranda');
    }
});

// ==========================================
// FUNGSI PAGINATION REKOMENDASI BERITA
// ==========================================
window.renderRecommendations = function() {
    const totalItems = window.recArticles.length;
    const totalPages = Math.ceil(totalItems / window.recItemsPerPage);
    
    // Hitung berita ke-berapa sampai ke-berapa yang harus tampil
    const startIndex = (window.currentRecPage - 1) * window.recItemsPerPage;
    const endIndex = Math.min(startIndex + window.recItemsPerPage, totalItems);
    
    // Potong data khusus untuk halaman yang sedang aktif
    const currentItems = window.recArticles.slice(startIndex, endIndex);

    // 1. Tampilkan Grid Beritanya
    const recommendationContainer = document.getElementById('recommendation-container');
    if (recommendationContainer) {
        recommendationContainer.innerHTML = currentItems.map(article => {
            const encodedArticle = encodeURIComponent(JSON.stringify(article));
            const cat = article.customCategory || window.currentCategoryName;
            return `
            <div class="group cursor-pointer flex flex-col" onclick="goToDetail('${encodedArticle}', '${cat}')">
                <img src="${getImageUrl(article)}" alt="News Image" class="w-full h-44 object-cover rounded-2xl mb-4 group-hover:opacity-90 transition duration-300">
                <h3 class="font-bold text-gray-800 text-base leading-snug mb-3 line-clamp-3 group-hover:text-blue-500 transition duration-300">
                    ${article.title}
                </h3>
                <div class="flex items-center gap-2 text-xs mt-auto">
                    <span class="text-blue-500 font-semibold uppercase">${cat}</span>
                    <span class="text-gray-300 text-[10px]"><i class="fa-solid fa-circle"></i></span>
                    <span class="text-gray-500">${formatDate(article.isoDate || article.pubDate)}</span>
                </div>
            </div>
            `;
        }).join('');
    }

    // 2. Update Teks "Showing 1 to X of Y"
    const showingText = document.getElementById('rec-showing-text');
    if (showingText) {
        showingText.textContent = totalItems === 0 
            ? "Tidak ada rekomendasi berita." 
            : `Menampilkan ${startIndex + 1} hingga ${endIndex} dari ${totalItems} hasil`;
    }

    // 3. Buat Tombol Angka dan Prev/Next
    const paginationContainer = document.getElementById('rec-pagination-container');
    if (paginationContainer) {
        let html = '';
        
        // Tombol Previous
        html += `<button onclick="changePage(${window.currentRecPage - 1})" class="px-3 py-2 transition ${window.currentRecPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-blue-500'}" ${window.currentRecPage === 1 ? 'disabled' : ''}>Previous</button>`;

        // Tombol Angka (1, 2, 3...)
       let pagesToShow=[]
       if (totalPages <= 5){
        for (let i = 1; i <= totalPages; i++) pagesToShow.push(i);
       } else {
        if (window.currentRecPage <= 3) {
                pagesToShow = [1, 2, 3, '...', totalPages];
            } else if (window.currentRecPage >= totalPages - 2) {
                pagesToShow = [1, '...', totalPages - 2, totalPages - 1, totalPages];
            } else {
                pagesToShow = [1, '...', window.currentRecPage - 1, window.currentRecPage, window.currentRecPage + 1, '...', totalPages];
            }
       }

       pagesToShow.forEach(i => {
            if (i === '...') {
                html += `<span class="px-2 text-gray-400">...</span>`;
            } else if (i === window.currentRecPage) {
                html += `<button class="w-10 h-10 rounded-lg bg-blue-500 text-white font-medium shadow-md">${i}</button>`;
            } else {
                html += `<button onclick="changePage(${i})" class="w-10 h-10 rounded-lg hover:bg-gray-100 font-medium text-gray-600 transition">${i}</button>`;
            }
        });

        // Tombol Next
        html += `<button onclick="changePage(${window.currentRecPage + 1})" class="px-3 py-2 transition ${window.currentRecPage >= totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-blue-500'}" ${window.currentRecPage >= totalPages || totalPages === 0 ? 'disabled' : ''}>Next</button>`;

        paginationContainer.innerHTML = html;
    }
};

// ==========================================
// FUNGSI SLIDER HEADLINE
// ==========================================
window.renderHeadline = function() {
    if (!window.headlineArticles || window.headlineArticles.length === 0) return;

    const headlineContainer = document.getElementById('headline-container');
    const headline = window.headlineArticles[window.currentHeadlineIndex];
    const encodedHeadline = encodeURIComponent(JSON.stringify(headline));
    const headlineCategory = headline.customCategory || window.headlineCategoryName;

    // 1. Tampilkan Berita Headline
    if (headlineContainer) {
        headlineContainer.innerHTML = `
            <div class="animate-fade-in">
                <p class="text-sm text-gray-500 font-medium mb-4">Headline</p>
                <h1 class="text-2xl md:text-3xl lg:text-[32px] font-bold text-gray-900 leading-tight mb-4 md:mb-6 hover:text-blue-500 transition cursor-pointer" onclick="goToDetail('${encodedHeadline}', '${headlineCategory}')">
                    ${headline.title}
                </h1>
                <p class="text-gray-500 leading-7 mb-5 line-clamp-3">
                    ${headline.description || 'Simak berita selengkapnya dengan mengklik tautan di bawah ini.'}
                </p>
                <p class="text-sm text-gray-400 mb-8">${formatDate(headline.isoDate || headline.pubDate)}</p>
                <span onclick="goToDetail('${encodedHeadline}', '${headlineCategory}')" class="text-blue-500 font-medium hover:underline cursor-pointer">Baca Selengkapnya....</span>
            </div>
            <div class="animate-fade-in">
                <div onclick="goToDetail('${encodedHeadline}', '${headlineCategory}')" class="cursor-pointer">
                    <img src="${getImageUrl(headline)}" alt="Headline" class="w-full h-56 sm:h-64 md:h-72 lg:h-[360px] object-cover rounded-2xl shadow-md hover:opacity-90 transition duration-300">
                </div>
            </div>
        `;
    }

    // 2. Render Indikator Titik-titik (Dots)
    const counterContainer = document.getElementById('headline-counter');
   if (counterContainer) {
        // currentHeadlineIndex dimulai dari 0, jadi kita tambah 1 agar tampilannya mulai dari "1"
        const currentPage = window.currentHeadlineIndex + 1; 
        const totalPages = window.headlineArticles.length;
        
        counterContainer.textContent = `${currentPage} dari ${totalPages}`;
    }
};

window.prevHeadline = function() {
    window.currentHeadlineIndex = (window.currentHeadlineIndex > 0) ? window.currentHeadlineIndex - 1 : window.headlineArticles.length - 1;
    window.renderHeadline();
};

window.nextHeadline = function() {
    window.currentHeadlineIndex = (window.currentHeadlineIndex < window.headlineArticles.length - 1) ? window.currentHeadlineIndex + 1 : 0;
    window.renderHeadline();
};

window.goToHeadline = function(index) {
    window.currentHeadlineIndex = index;
    window.renderHeadline();
};

// 4. Fungsi Interaksi Klik Tombol
window.changePage = function(page) {
    window.currentRecPage = page; // Ganti angka halamannya
    window.renderRecommendations(); // Render ulang grid beritanya
    
    // Gulir layar secara mulus kembali ke atas judul Rekomendasi
    document.getElementById('recommendation-container').scrollIntoView({ behavior: 'smooth', block: 'center' });
};

// Fungsi global untuk menyimpan berita ke memory dan pindah halaman
window.goToDetail = function(articleString, category) {
    localStorage.setItem('selectedArticle', articleString);
    window.location.href = `detail.html?category=${encodeURIComponent(category)}`;
};

