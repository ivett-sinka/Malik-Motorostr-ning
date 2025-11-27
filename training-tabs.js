/**
 * Responsive Training Tabs
 * Fül navigáció a tréning kártyákhoz 1140px alatt
 */

document.addEventListener('DOMContentLoaded', function() {

    // Dinamikus magasság beállítása
    function updateContainerHeight() {
        if (window.innerWidth <= 1140) {
            const activeCard = document.querySelector('.training-cards .training-card.active');
            const container = document.querySelector('.training-cards');

            if (activeCard && container) {
                const cardHeight = activeCard.offsetHeight;
                const currentHeight = parseInt(container.style.minHeight) || 0;

                // Csak akkor frissítünk, ha változott a magasság
                if (Math.abs(cardHeight - currentHeight) > 5) {
                    container.style.minHeight = cardHeight + 'px';
                }
            }
        }
    }

    // Periodikus magasság ellenőrzés (fallback lazy loading képekhez)
    let heightCheckInterval = null;

    function startHeightCheck() {
        // Töröljük az előző intervalt, ha van
        if (heightCheckInterval) {
            clearInterval(heightCheckInterval);
        }

        if (window.innerWidth <= 1140) {
            // Első 30 másodpercben gyakrabban ellenőriz (lazy loading képek miatt)
            let checkCount = 0;
            const maxChecks = 60; // 30 másodperc (500ms × 60)

            heightCheckInterval = setInterval(() => {
                updateContainerHeight();
                checkCount++;

                // 30 mp után ritkábban ellenőriz
                if (checkCount >= maxChecks) {
                    clearInterval(heightCheckInterval);
                    // Utána 5 másodpercenként
                    heightCheckInterval = setInterval(updateContainerHeight, 5000);
                }
            }, 500); // 500ms-enként az első 30 mp-ben
        }
    }

    function stopHeightCheck() {
        if (heightCheckInterval) {
            clearInterval(heightCheckInterval);
            heightCheckInterval = null;
        }
    }

    // Tabs inicializálása
    function initTrainingTabs() {
        const tabButtons = document.querySelectorAll('.training-tabs-nav .tab-button');
        const tabContents = document.querySelectorAll('.training-cards .training-card');

        // Ha nincs tab elem, kilépünk
        if (tabButtons.length === 0 || tabContents.length === 0) {
            return;
        }

        // Tab váltás kezelése
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');

                // Aktív gomb frissítése
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Tartalom váltása slide animációval
                tabContents.forEach(content => {
                    const contentTab = content.getAttribute('data-tab-content');

                    if (contentTab === targetTab) {
                        // Új tartalom becsúsztatása jobbról balra
                        setTimeout(() => {
                            content.classList.add('active');
                            content.classList.remove('slide-out');

                            // Magasság frissítése és folyamatos ellenőrzés indítása
                            updateContainerHeight();
                            startHeightCheck();
                        }, 50);
                    } else {
                        // Régi tartalom eltüntetése
                        content.classList.add('slide-out');
                        content.classList.remove('active');
                    }
                });
            });
        });

        // Első kártya aktív állapotba helyezése
        if (tabContents.length > 0) {
            tabContents[0].classList.add('active');
            // Kezdeti magasság beállítása és folyamatos ellenőrzés
            setTimeout(() => {
                updateContainerHeight();
                startHeightCheck();
            }, 100);
        }
    }

    // Inicializálás indítása
    initTrainingTabs();

    // Window resize kezelése
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Tabs reset nagyobb képernyőn (1140px felett)
            if (window.innerWidth > 1140) {
                const tabContents = document.querySelectorAll('.training-cards .training-card');
                const container = document.querySelector('.training-cards');

                tabContents.forEach(content => {
                    content.classList.remove('active', 'slide-out');
                    content.style.position = '';
                    content.style.opacity = '';
                    content.style.transform = '';
                });

                // Konténer magasság reset és ellenőrzés leállítása
                if (container) {
                    container.style.minHeight = '';
                }
                stopHeightCheck();
            } else {
                // Mobilon újra inicializáljuk és ellenőrzés indítása
                initTrainingTabs();
                updateContainerHeight();
                startHeightCheck();
            }
        }, 250);
    });
});
