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
        currentOffset: 0,
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
        touchState.currentOffset = 0;
        touchState.track = track;

        // Add dragging class to pause animation
        track.classList.add('dragging');

        console.log('Touch start at:', touchState.startX);
    }

    /**
     * Handle touch move for swipe gestures
     */
    function handleTouchMove(e) {
        if (!touchState.isDragging || window.innerWidth > CONFIG.breakpoint) return;

        touchState.currentX = e.touches[0].clientX;
        touchState.currentOffset = touchState.currentX - touchState.startX;

        // Update transform - directly set translateX
        if (touchState.track) {
            touchState.track.style.transform = `translateX(${touchState.currentOffset}px)`;
        }

        // Only prevent default if horizontal swipe is significant
        if (Math.abs(touchState.currentOffset) > 10) {
            e.preventDefault();
        }

        console.log('Touch move, offset:', touchState.currentOffset);
    }

    /**
     * Handle touch end - resume animation
     */
    function handleTouchEnd() {
        if (!touchState.isDragging) return;

        console.log('Touch end, total offset was:', touchState.currentOffset);

        touchState.isDragging = false;

        if (touchState.track) {
            // Remove dragging class to resume animation
            touchState.track.classList.remove('dragging');

            // Remove inline transform to let CSS animation take over
            touchState.track.style.transform = '';
        }

        // Reset touch state
        touchState.currentOffset = 0;
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
