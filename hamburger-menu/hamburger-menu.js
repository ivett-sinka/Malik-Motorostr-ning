/**
 * Hamburger Menu Animation & Functionality
 * Compatible with WordPress structure
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {

        // Get elements
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const body = document.body;

        // Create overlay if it doesn't exist
        let overlay = document.querySelector('.overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'overlay';
            document.body.appendChild(overlay);
        }

        // Check if elements exist
        if (!hamburger || !navMenu) {
            console.error('Hamburger menu elements not found!');
            return;
        }

        // Menu state
        let isOpen = false;
        let isAnimating = false;

        /**
         * Toggle menu open/close
         */
        function toggleMenu() {
            if (isAnimating) return;

            isAnimating = true;
            isOpen = !isOpen;

            if (isOpen) {
                openMenu();
            } else {
                closeMenu();
            }

            // Reset animation lock after animation completes
            setTimeout(() => {
                isAnimating = false;
            }, 800); // Match the animation duration
        }

        /**
         * Open the menu
         */
        function openMenu() {
            // Add classes
            hamburger.classList.add('nyitva');
            hamburger.classList.add('animating');
            hamburger.classList.remove('closing');

            navMenu.classList.add('nyitva');
            navMenu.classList.add('active');

            overlay.classList.add('active');

            // Prevent body scroll
            body.style.overflow = 'hidden';

            // Animate menu items
            animateMenuItems('in');

            // After animation, set to active state
            setTimeout(() => {
                hamburger.classList.remove('animating');
                hamburger.classList.add('active');
            }, 800);
        }

        /**
         * Close the menu
         */
        function closeMenu() {
            // Add closing animation
            hamburger.classList.add('closing');
            hamburger.classList.remove('active');
            hamburger.classList.remove('animating');

            navMenu.classList.remove('active');
            overlay.classList.remove('active');

            // Animate menu items out
            animateMenuItems('out');

            // Allow body scroll
            body.style.overflow = '';

            // After animation completes, remove all classes
            setTimeout(() => {
                hamburger.classList.remove('closing');
                hamburger.classList.remove('nyitva');
                navMenu.classList.remove('nyitva');
            }, 800);
        }

        /**
         * Animate menu items in or out
         * @param {string} direction - 'in' or 'out'
         */
        function animateMenuItems(direction) {
            const menuItems = navMenu.querySelectorAll('#main-menu ul li, #bottom-head ul li');

            menuItems.forEach((item, index) => {
                if (direction === 'in') {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(50px)';
                }
            });
        }

        /**
         * Close menu when clicking outside
         */
        function handleOutsideClick(e) {
            if (isOpen && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                toggleMenu();
            }
        }

        /**
         * Close menu on ESC key
         */
        function handleEscKey(e) {
            if (e.key === 'Escape' && isOpen) {
                toggleMenu();
            }
        }

        /**
         * Handle window resize
         */
        function handleResize() {
            // Close menu on desktop view
            if (window.innerWidth > 1380 && isOpen) {
                closeMenu();
                isOpen = false;
            }
        }

        // Event listeners
        hamburger.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
        document.addEventListener('keydown', handleEscKey);
        window.addEventListener('resize', handleResize);

        // Close menu when clicking on menu links (optional - good for UX)
        const menuLinks = navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (isOpen) {
                    setTimeout(() => {
                        toggleMenu();
                    }, 300); // Small delay for better UX
                }
            });
        });

        // Initialize menu items for animation
        const menuItems = navMenu.querySelectorAll('#main-menu ul li, #bottom-head ul li');
        menuItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(50px)';
            item.style.transition = 'all 0.5s ease';
        });

        console.log('Hamburger menu initialized successfully!');
    });

})();
