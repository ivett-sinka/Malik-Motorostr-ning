/**
 * Számláló animáció - Rólam szekció
 * Automatikusan animálja a számokat, amikor a látómezőbe kerülnek
 */

document.addEventListener('DOMContentLoaded', function() {

    // Intersection Observer beállítások
    const observerOptions = {
        threshold: 0.3, // 30%-ban látható legyen
        rootMargin: '0px'
    };

    // Számláló animáció függvény
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 másodperc
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;

            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    // Observer callback függvény
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter-value');

                counters.forEach(counter => {
                    // Reset counter
                    counter.textContent = '0';
                    // Start animation
                    animateCounter(counter);
                });

                // Unobserve után az animáció elindul (csak egyszer játssza le)
                observer.unobserve(entry.target);
            }
        });
    };

    // Intersection Observer létrehozása
    const counterObserver = new IntersectionObserver(handleIntersection, observerOptions);

    // Mindkét számláló wrapper megfigyelése (desktop és mobile)
    const counterWrappers = document.querySelectorAll('.counter-wrapper');

    counterWrappers.forEach(wrapper => {
        // Csak azokat figyeljük, amelyek láthatók
        const isVisible = window.getComputedStyle(wrapper).display !== 'none';

        if (isVisible) {
            counterObserver.observe(wrapper);
        }
    });

    // Window resize kezelése - újra beállítjuk az observert
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Disconnect és újra observe a látható wrapperekre
            counterObserver.disconnect();

            const counterWrappers = document.querySelectorAll('.counter-wrapper');
            counterWrappers.forEach(wrapper => {
                const isVisible = window.getComputedStyle(wrapper).display !== 'none';

                if (isVisible) {
                    // Reset counters
                    const counters = wrapper.querySelectorAll('.counter-value');
                    counters.forEach(counter => {
                        counter.textContent = '0';
                    });

                    counterObserver.observe(wrapper);
                }
            });
        }, 250);
    });
});
