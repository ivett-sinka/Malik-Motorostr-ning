// Get elements
const hamburgerBtn = document.getElementById('hamburger');
const navMenu = document.getElementById('main-menu');
const overlay = document.getElementById('overlay');
const navLinks = document.querySelectorAll('.menu-item a');

let isOpen = false;
let isAnimating = false;

// Toggle menu function
function toggleMenu() {
    if (isAnimating) return; // Prevent clicks during animation

    isAnimating = true;

    if (!isOpen) {
        // Opening menu: Hamburger → Arrows → X
        hamburgerBtn.classList.add('animating');
        hamburgerBtn.classList.remove('closing');

        // Wait for animation to complete, then set active state
        setTimeout(() => {
            hamburgerBtn.classList.remove('animating');
            hamburgerBtn.classList.add('active');
            navMenu.classList.add('active');
            overlay.classList.add('active');
            isOpen = true;
            isAnimating = false;
        }, 800); // Match animation duration

    } else {
        // Closing menu: X → Arrows → Hamburger
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.classList.add('closing');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');

        // Wait for animation to complete
        setTimeout(() => {
            hamburgerBtn.classList.remove('closing');
            isOpen = false;
            isAnimating = false;
        }, 800); // Match animation duration
    }
}

// Event listeners
hamburgerBtn.addEventListener('click', toggleMenu);

// Close menu when clicking overlay
overlay.addEventListener('click', () => {
    if (isOpen) {
        toggleMenu();
    }
});

// Close menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isOpen) {
            toggleMenu();
        }
    });
});

// Close menu on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
        toggleMenu();
    }
});

// Prevent body scroll when menu is open
function updateBodyScroll() {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Update body scroll on menu toggle
hamburgerBtn.addEventListener('click', () => {
    setTimeout(updateBodyScroll, 100);
});
