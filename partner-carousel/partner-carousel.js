/**
 * Partner Carousel JavaScript
 * Creates seamless infinite carousel animation on mobile devices
 * Duplicates partner icons for continuous loop effect
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        breakpoint: 860,           // Mobile breakpoint in pixels
        duplicateCount: 2,         // How many times to duplicate the content
        containerSelector: '.partnerek-sor',
        iconSelector: '.partner-icon'
    };

    // State
    let isInitialized = false;
    let carouselContainer = null;
    let originalIcons = [];
    let animationFrameId = null;
    let currentPosition = 0;
    let animationSpeed = 0.5; // pixels per frame

    // Touch state for swipe gestures
    let touchState = {
        isDragging: false,
        startX: 0,
        currentX: 0,
        currentOffset: 0,
        track: null
    };

    // Hover state
    let isHovering = false;

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
     * Animation loop for continuous scrolling
     */
    function animate() {
        if (!isInitialized) {
            animationFrameId = requestAnimationFrame(animate);
            return;
        }

        const track = carouselContainer.querySelector('.carousel-track');
        if (!track) {
            animationFrameId = requestAnimationFrame(animate);
            return;
        }

        // Only move if not dragging and not hovering
        if (!touchState.isDragging && !isHovering) {
            // Move left continuously
            currentPosition -= animationSpeed;

            // Get track width (half of it, because we duplicated content)
            const trackWidth = track.offsetWidth / (CONFIG.duplicateCount + 1);

            // Reset position for seamless loop
            if (Math.abs(currentPosition) >= trackWidth) {
                currentPosition = 0;
            }

            track.style.transform = `translateX(${currentPosition}px)`;
        }

        animationFrameId = requestAnimationFrame(animate);
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

        // Add hover event listeners for desktop
        carouselContainer.addEventListener('mouseenter', function() {
            isHovering = true;
        });
        carouselContainer.addEventListener('mouseleave', function() {
            isHovering = false;
        });

        // Mark as initialized
        carouselContainer.classList.add('carousel-initialized');
        isInitialized = true;

        // Start animation loop
        currentPosition = 0;
        animate();

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

        // Add dragging class (visual feedback)
        track.classList.add('dragging');

        console.log('Touch start at:', touchState.startX, 'Current position:', currentPosition);
    }

    /**
     * Handle touch move for swipe gestures
     */
    function handleTouchMove(e) {
        if (!touchState.isDragging || window.innerWidth > CONFIG.breakpoint) return;

        touchState.currentX = e.touches[0].clientX;
        touchState.currentOffset = touchState.currentX - touchState.startX;

        // Update transform - add offset to current animation position
        if (touchState.track) {
            touchState.track.style.transform = `translateX(${currentPosition + touchState.currentOffset}px)`;
        }

        // Only prevent default if horizontal swipe is significant
        if (Math.abs(touchState.currentOffset) > 10) {
            e.preventDefault();
        }
    }

    /**
     * Handle touch end - resume animation from current position
     */
    function handleTouchEnd() {
        if (!touchState.isDragging) return;

        console.log('Touch end, offset was:', touchState.currentOffset, 'Resuming from:', currentPosition + touchState.currentOffset);

        // Update current position with the drag offset
        currentPosition += touchState.currentOffset;

        touchState.isDragging = false;

        if (touchState.track) {
            // Remove dragging class
            touchState.track.classList.remove('dragging');
        }

        // Reset touch offset (position is already updated in currentPosition)
        touchState.currentOffset = 0;
        touchState.track = null;

        // Animation will continue from updated currentPosition
    }

    /**
     * Destroy mobile carousel and restore original layout
     */
    function destroyMobileCarousel() {
        if (!isInitialized) return;

        console.log('Destroying mobile carousel...');

        // Stop animation loop
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }

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
        currentPosition = 0;

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
