/**
 * Responsive Training Tabs
 * Fül navigáció a tréning kártyákhoz 1140px alatt
 */

document.addEventListener('DOMContentLoaded', function() {

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
                tabContents.forEach(content => {
                    content.classList.remove('active', 'slide-out');
                    content.style.position = '';
                    content.style.opacity = '';
                    content.style.transform = '';
                });
            } else {
                // Mobilon újra inicializáljuk
                initTrainingTabs();
            }
        }, 250);
    });
});
