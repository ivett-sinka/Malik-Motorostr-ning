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
                container.style.minHeight = cardHeight + 'px';
            }
        }
    }

    // Képek betöltésének figyelése
    function watchImagesLoad() {
        const images = document.querySelectorAll('.training-cards img');

        images.forEach(img => {
            // Ha a kép már betöltött
            if (img.complete) {
                updateContainerHeight();
            } else {
                // Ha még nem töltött be, figyeljük
                img.addEventListener('load', () => {
                    updateContainerHeight();
                });
            }
        });
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

                            // Magasság frissítése az új tartalomhoz
                            updateContainerHeight();
                            watchImagesLoad();
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
            // Kezdeti magasság beállítása
            setTimeout(() => {
                updateContainerHeight();
                watchImagesLoad();
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

                // Konténer magasság reset
                if (container) {
                    container.style.minHeight = '';
                }
            } else {
                // Mobilon újra inicializáljuk és frissítjük a magasságot
                initTrainingTabs();
                updateContainerHeight();
            }
        }, 250);
    });
});
