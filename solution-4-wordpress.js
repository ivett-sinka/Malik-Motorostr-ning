/**
 * WordPress Training Card SVG Háttér Injector
 * Automatikusan beilleszti az SVG-t minden .training-card-background elembe
 */

(function() {
    'use strict';

    // SVG tartalom
    const svgContent = `
        <svg viewBox="0 0 536 1387" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_159_30)">
                <path d="M406.731 0C415.224 0 423.318 3.59899 429.007 9.9043L528.274 119.938C533.247 125.449 536 132.609 536 140.032V1367C536 1378.05 527.046 1387 516 1387H20C8.95431 1387 0 1378.05 0 1367V20C5.15439e-06 8.95431 8.95431 1.03081e-06 20 0H406.731Z" fill="#E8E8E8"/>
            </g>
            <defs>
                <clipPath id="clip0_159_30">
                    <rect width="536" height="1387" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    `;

    /**
     * Beszúrja az SVG-t a háttér elemekbe
     */
    function injectSVGBackgrounds() {
        const backgrounds = document.querySelectorAll('.training-card-background');

        backgrounds.forEach((bg, index) => {
            // Csak akkor injektáljuk, ha még nincs tartalma
            if (bg.children.length === 0) {
                bg.innerHTML = svgContent;

                // Egyedi ID a clipPath-hoz, hogy ne legyen konfliktus
                const svg = bg.querySelector('svg');
                const clipPath = svg.querySelector('clipPath');
                const path = svg.querySelector('path');

                if (clipPath && path) {
                    const uniqueId = `clip_${index}_${Date.now()}`;
                    clipPath.setAttribute('id', uniqueId);
                    path.setAttribute('clip-path', `url(#${uniqueId})`);
                }

                console.log(`✅ SVG injected into training-card-background ${index + 1}`);
            }
        });
    }

    /**
     * Alternatíva: IMG tag beszúrása
     */
    function injectImageBackgrounds() {
        const backgrounds = document.querySelectorAll('.training-card-background');

        backgrounds.forEach((bg, index) => {
            if (bg.children.length === 0) {
                const img = document.createElement('img');
                img.src = '/wp-content/uploads/card-grey-bg.svg';
                img.alt = '';
                img.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: fill;';
                bg.appendChild(img);

                console.log(`✅ IMG injected into training-card-background ${index + 1}`);
            }
        });
    }

    /**
     * ResizeObserver a dinamikus méretváltozáshoz
     */
    function setupResizeObserver() {
        if (typeof ResizeObserver === 'undefined') return;

        const observer = new ResizeObserver(entries => {
            entries.forEach(entry => {
                const card = entry.target;
                const bg = card.querySelector('.training-card-background');

                if (bg) {
                    // Háttér elem mindig követi a kártya méretét
                    bg.style.width = card.offsetWidth + 'px';
                    bg.style.height = card.offsetHeight + 'px';
                }
            });
        });

        document.querySelectorAll('.training-card').forEach(card => {
            observer.observe(card);
        });
    }

    /**
     * Inicializálás
     */
    function init() {
        console.log('🚀 Training Card SVG Background Injector Loading...');

        // Válaszd ki melyik módszert szeretnéd:

        // Opció 1: Inline SVG (ajánlott)
        injectSVGBackgrounds();

        // Opció 2: IMG tag (alternatíva)
        // injectImageBackgrounds();

        // ResizeObserver beállítása
        setupResizeObserver();

        console.log('✅ Training Card SVG Background Injector Ready');
    }

    // Inicializálás amikor a DOM betöltődött
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Újrainicializálás ha új tartalom töltődik be (pl. AJAX)
    window.addEventListener('load', injectSVGBackgrounds);

    // Export funkciók (ha szükséges)
    window.TrainingCardBG = {
        inject: injectSVGBackgrounds,
        injectImages: injectImageBackgrounds
    };

})();
