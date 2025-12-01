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

    // Touch state for swipe gestures
    let touchState = {
        isDragging: false,
        startX: 0,
        currentX: 0,
        startTransform: 0,
        track: null
    };

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

        // Add touch event listeners
        carouselContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
        carouselContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
        carouselContainer.addEventListener('touchend', handleTouchEnd);
        carouselContainer.addEventListener('touchcancel', handleTouchEnd);

        // Mark as initialized
        carouselContainer.classList.add('carousel-initialized');
        isInitialized = true;

        console.log('Mobile carousel initialized with', track.children.length, 'items');
    }

    /**
     * Handle touch start for swipe gestures
     */
    function handleTouchStart(e) {
        if (window.innerWidth > CONFIG.breakpoint) return;

        const track = carouselContainer.querySelector('.carousel-track');
        if (!track) return;

        touchState.isDragging = true;
        touchState.startX = e.touches[0].clientX;
        touchState.track = track;

        // Get current transform value
        const style = window.getComputedStyle(track);
        const matrix = new DOMMatrix(style.transform);
        touchState.startTransform = matrix.m41; // translateX value

        // Add dragging class to pause animation
        track.classList.add('dragging');
    }

    /**
     * Handle touch move for swipe gestures
     */
    function handleTouchMove(e) {
        if (!touchState.isDragging || window.innerWidth > CONFIG.breakpoint) return;

        // Prevent default scrolling
        e.preventDefault();

        touchState.currentX = e.touches[0].clientX;
        const diff = touchState.currentX - touchState.startX;

        // Update transform based on swipe
        if (touchState.track) {
            touchState.track.style.transform = `translateX(${touchState.startTransform + diff}px)`;
        }
    }

    /**
     * Handle touch end - resume animation
     */
    function handleTouchEnd() {
        if (!touchState.isDragging) return;

        touchState.isDragging = false;

        if (touchState.track) {
            // Remove dragging class to resume animation
            touchState.track.classList.remove('dragging');

            // Reset inline transform to let CSS animation take over
            // We'll let the animation continue from where it was
            setTimeout(() => {
                if (touchState.track) {
                    touchState.track.style.transform = '';
                }
            }, 50);
        }

        // Reset touch state
        touchState.track = null;
    }

    /**
     * Destroy mobile carousel and restore original layout
     */
    function destroyMobileCarousel() {
        if (!isInitialized) return;

        console.log('Destroying mobile carousel...');

        // Remove touch event listeners
        if (carouselContainer) {
            carouselContainer.removeEventListener('touchstart', handleTouchStart);
            carouselContainer.removeEventListener('touchmove', handleTouchMove);
            carouselContainer.removeEventListener('touchend', handleTouchEnd);
            carouselContainer.removeEventListener('touchcancel', handleTouchEnd);
        }

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
