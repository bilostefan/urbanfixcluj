document.addEventListener('DOMContentLoaded', () => {

    // --- Configuration ---
    // PASTE YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL HERE
    // Example: const GAS_URL = "https://script.google.com/macros/s/AKfycbx.../exec";
    const GAS_URL = "";

    // --- Navigation & Scroll ---
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    const header = document.querySelector('.navbar');

    // Toggle Mobile Menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            hamburger.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
        } else {
            header.style.boxShadow = "none";
        }
    });

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Gallery Logic ---
    const galleryGrid = document.getElementById('gallery-grid');
    const loader = document.getElementById('gallery-loader');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    // Fetch Images
    async function loadGallery() {
        if (!GAS_URL) {
            console.log("No Google Apps Script URL provided. Showing default placeholder.");
            return; // Keep default content
        }

        try {
            loader.classList.remove('hidden');
            // Clear placeholders if we are fetching real data
            galleryGrid.innerHTML = '';

            const response = await fetch(GAS_URL);
            const data = await response.json();

            loader.classList.add('hidden');

            if (data.success && data.data.length > 0) {
                data.data.forEach(imgData => {
                    const item = document.createElement('div');
                    item.className = 'gallery-item';

                    const img = document.createElement('img');
                    img.src = imgData.url;
                    img.alt = "Imagine Galerie";
                    img.loading = "lazy";

                    item.appendChild(img);
                    galleryGrid.appendChild(item);

                    // Lightbox Click
                    item.addEventListener('click', () => {
                        lightbox.style.display = 'flex';
                        lightboxImg.src = imgData.url;
                    });
                });
            } else {
                console.warn("No images found or error in data.", data);
                galleryGrid.innerHTML = '<p class="center" style="grid-column: 1/-1;">Nu s-au găsit imagini în folderul conectat.</p>';
            }

        } catch (error) {
            console.error("Error fetching gallery:", error);
            loader.classList.add('hidden');
            galleryGrid.innerHTML = '<p class="center" style="grid-column: 1/-1;">Nu s-au putut încărca imaginile. Vă rugăm să verificați conexiunea.</p>';
        }
    }

    // Lightbox Controls
    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            lightboxImg.src = '';
        }
    });

    // Initialize
    loadGallery();
});
