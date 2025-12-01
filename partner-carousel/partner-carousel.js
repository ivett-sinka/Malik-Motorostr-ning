/**
 * Partner Carousel JavaScript
 * Creates seamless infinite carousel animation on mobile devices
 * Duplicates partner icons for continuous loop effect
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        breakpoint: 768,           // Mobile breakpoint in pixels
        duplicateCount: 2,         // How many times to duplicate the content
        containerSelector: '.partnerek-sor',
        iconSelector: '.partner-icon'
    };

    // State
    let isInitialized = false;
    let carouselContainer = null;
    let originalIcons = [];

    /**
     * Initialize the carousel
     */
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Find the container
        carouselContainer = document.querySelector(CONFIG.containerSelector);

        if (!carouselContainer) {
            console.warn('Partner carousel: Container not found');
            return;
        }

        // Store original icons
        originalIcons = Array.from(carouselContainer.querySelectorAll(CONFIG.iconSelector));

        if (originalIcons.length === 0) {
            console.warn('Partner carousel: No partner icons found');
            return;
        }

        // Initialize carousel on mobile
        handleResize();

        // Listen for window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(handleResize, 150);
        });

        console.log('Partner carousel initialized successfully');
    }

    /**
     * Handle window resize
     */
    function handleResize() {
        const isMobile = window.innerWidth <= CONFIG.breakpoint;

        if (isMobile && !isInitialized) {
            initMobileCarousel();
        } else if (!isMobile && isInitialized) {
            destroyMobileCarousel();
        }
    }

    /**
     * Initialize mobile carousel
     */
    function initMobileCarousel() {
        if (isInitialized) return;

        console.log('Initializing mobile carousel...');

        // Create carousel track
        const track = document.createElement('div');
        track.className = 'carousel-track';

        // Add original icons to track
        originalIcons.forEach(icon => {
            const clone = icon.cloneNode(true);
            clone.classList.remove('duplicate'); // Ensure no duplicate class on originals
            track.appendChild(clone);
        });

        // Duplicate icons for seamless loop
        for (let i = 0; i < CONFIG.duplicateCount; i++) {
            originalIcons.forEach(icon => {
                const clone = icon.cloneNode(true);
                clone.classList.add('duplicate');
                track.appendChild(clone);
            });
        }

        // Clear container and add track
        carouselContainer.innerHTML = '';
        carouselContainer.appendChild(track);

        // Mark as initialized
        carouselContainer.classList.add('carousel-initialized');
        isInitialized = true;

        console.log('Mobile carousel initialized with', track.children.length, 'items');
    }

    /**
     * Destroy mobile carousel and restore original layout
     */
    function destroyMobileCarousel() {
        if (!isInitialized) return;

        console.log('Destroying mobile carousel...');

        // Clear container
        carouselContainer.innerHTML = '';

        // Restore original icons
        originalIcons.forEach(icon => {
            carouselContainer.appendChild(icon.cloneNode(true));
        });

        // Remove initialized class
        carouselContainer.classList.remove('carousel-initialized');
        isInitialized = false;

        console.log('Mobile carousel destroyed');
    }

    /**
     * Public API (if needed)
     */
    window.PartnerCarousel = {
        init: init,
        destroy: destroyMobileCarousel,
        reinit: function() {
            destroyMobileCarousel();
            handleResize();
        }
    };

    // Auto-initialize
    init();

})();
