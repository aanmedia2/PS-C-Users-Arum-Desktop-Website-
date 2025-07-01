// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Mencegah perilaku default (meloncat) jika itu adalah link internal
            // Kecualikan link yang hanya berisi '#' atau yang mungkin punya fungsi lain
            if (this.getAttribute('href').length > 1) { // Memastikan bukan hanya '#'
                e.preventDefault(); 

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth' // Ini yang membuat scroll menjadi halus
                    });
                }
            }
        });
    });

    // --- Intersection Observer for Fade-in Sections (Scroll Reveal) ---
    const fadeElements = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px 0px -10% 0px', // Trigger when 10% of the element is visible from the bottom
        threshold: 0.1 // Percentage of element that needs to be visible to trigger
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add 'is-visible' when entering viewport
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once visible if animation should only play once
                // observer.unobserve(entry.target); 
            } else {
                // Optional: Remove 'is-visible' when leaving viewport for re-animation on scroll back
                // This might make animations replay when scrolling up, which might not always be desired.
                // If you want it to only animate once, uncomment the unobserve line above.
                // entry.target.classList.remove('is-visible'); 
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // --- Back to Top Button Functionality ---
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            backToTopBtn.style.display = 'block';
            backToTopBtn.style.opacity = '1';
        } else {
            backToTopBtn.style.opacity = '0';
            // Use a timeout to hide display: 'none' after the fade-out transition
            setTimeout(() => {
                // Only hide if scroll position is still below threshold after timeout
                if (window.scrollY <= 300) {
                    backToTopBtn.style.display = 'none';
                }
            }, 300); // Should match CSS transition duration for opacity
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});