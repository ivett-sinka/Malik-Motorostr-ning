/**
 * Training Card SVG háttérkép dinamikus méretezés
 * Biztosítja, hogy az SVG háttérkép mindig pontosan felvegye a .training-card div méretét
 */

(function() {
    'use strict';

    /**
     * Beállítja az SVG háttérkép helyes méretezését
     */
    function setSVGBackgroundSize() {
        const trainingCards = document.querySelectorAll('.training-card');

        trainingCards.forEach(card => {
            // Ellenőrizzük, hogy a kártyának van-e background-image-e
            const computedStyle = window.getComputedStyle(card);
            const backgroundImage = computedStyle.backgroundImage;

            if (backgroundImage && backgroundImage !== 'none') {
                // Beállítjuk a háttérkép méretezését
                card.style.backgroundSize = '100% 100%';
                card.style.backgroundPosition = 'center center';
                card.style.backgroundRepeat = 'no-repeat';
                card.style.backgroundOrigin = 'border-box';
                card.style.backgroundClip = 'border-box';
            }
        });
    }

    /**
     * ResizeObserver használata dinamikus átméretezéshez
     */
    function setupDynamicResize() {
        const trainingCards = document.querySelectorAll('.training-card');

        // ResizeObserver támogatás ellenőrzése
        if (typeof ResizeObserver !== 'undefined') {
            const resizeObserver = new ResizeObserver(entries => {
                entries.forEach(entry => {
                    const card = entry.target;

                    // Biztosítjuk, hogy a háttérkép méretezés helyes maradjon
                    card.style.backgroundSize = '100% 100%';
                    card.style.backgroundPosition = 'center center';
                });
            });

            trainingCards.forEach(card => {
                resizeObserver.observe(card);
            });
        }
    }

    /**
     * MutationObserver a DOM változások figyelésére
     */
    function setupMutationObserver() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const target = mutation.target;
                    if (target.classList.contains('training-card')) {
                        // Biztosítjuk, hogy a background-size mindig 100% 100% maradjon
                        if (target.style.backgroundImage) {
                            target.style.backgroundSize = '100% 100%';
                        }
                    }
                }
            });
        });

        document.querySelectorAll('.training-card').forEach(card => {
            observer.observe(card, {
                attributes: true,
                attributeFilter: ['style']
            });
        });
    }

    /**
     * Inicializálás
     */
    function init() {
        // Alapértelmezett beállítás
        setSVGBackgroundSize();

        // Dinamikus átméretezés beállítása
        setupDynamicResize();

        // DOM változások figyelése
        setupMutationObserver();

        // Window resize esemény kezelése (fallback)
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(setSVGBackgroundSize, 100);
        });

        console.log('Training Card SVG háttérkép méretezés aktiválva');
    }

    // Inicializálás amikor a DOM betöltődött
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // A DOM már betöltődött
        init();
    }

    // Újrainicializálás új tartalom betöltésekor (pl. AJAX után)
    window.addEventListener('load', setSVGBackgroundSize);

})();
