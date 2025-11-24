/**
 * SVG háttérkép dinamikus méretezés
 * Ez a script biztosítja, hogy az SVG háttérkép mindig pontosan felvegye a konténer méretét
 */

// Megoldás 1: CSS background-image SVG esetén
function setSVGBackgroundSize() {
    const cards = document.querySelectorAll('.training-card, .card');

    cards.forEach(card => {
        // Alkalmazzuk a CSS tulajdonságokat JavaScriptből
        card.style.backgroundSize = '100% 100%';
        card.style.backgroundPosition = 'center center';
        card.style.backgroundRepeat = 'no-repeat';
    });
}

// Megoldás 2: Ha az SVG inline módon van a DOM-ban (nem background-image)
function adjustInlineSVG() {
    const cards = document.querySelectorAll('.training-card, .card');

    cards.forEach(card => {
        const svg = card.querySelector('svg');

        if (svg) {
            // SVG konténer méretének lekérdezése
            const cardWidth = card.offsetWidth;
            const cardHeight = card.offsetHeight;

            // SVG méretének beállítása
            svg.setAttribute('width', cardWidth);
            svg.setAttribute('height', cardHeight);

            // ViewBox beállítása, hogy az SVG tartalma kitöltse a teljes területet
            svg.setAttribute('preserveAspectRatio', 'none');

            // Ha nincs viewBox, állítsunk be egyet
            if (!svg.hasAttribute('viewBox')) {
                svg.setAttribute('viewBox', `0 0 ${cardWidth} ${cardHeight}`);
            }
        }
    });
}

// Megoldás 3: ResizeObserver használata dinamikus méretezéshez
function setupDynamicSVGResize() {
    const cards = document.querySelectorAll('.training-card, .card');

    const resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
            const card = entry.target;
            const svg = card.querySelector('svg');

            if (svg) {
                const cardWidth = card.offsetWidth;
                const cardHeight = card.offsetHeight;

                svg.setAttribute('width', cardWidth);
                svg.setAttribute('height', cardHeight);
                svg.setAttribute('preserveAspectRatio', 'none');

                if (!svg.hasAttribute('viewBox')) {
                    svg.setAttribute('viewBox', `0 0 ${cardWidth} ${cardHeight}`);
                }
            }

            // CSS background esetén is frissítjük
            card.style.backgroundSize = '100% 100%';
        });
    });

    cards.forEach(card => {
        resizeObserver.observe(card);
    });
}

// Megoldás 4: SVG data URL dinamikus generálás
function createStretchedSVGBackground(card, svgContent) {
    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;

    // SVG wrapper a megfelelő méretekkel
    const svgWrapper = `
        <svg xmlns="http://www.w3.org/2000/svg"
             width="${cardWidth}"
             height="${cardHeight}"
             viewBox="0 0 ${cardWidth} ${cardHeight}"
             preserveAspectRatio="none">
            ${svgContent}
        </svg>
    `;

    // Base64 kódolás
    const encodedSVG = btoa(unescape(encodeURIComponent(svgWrapper)));

    // Háttérkép beállítása
    card.style.backgroundImage = `url('data:image/svg+xml;base64,${encodedSVG}')`;
    card.style.backgroundSize = '100% 100%';
    card.style.backgroundRepeat = 'no-repeat';
    card.style.backgroundPosition = 'center center';
}

// Inicializálás amikor a DOM betöltődött
document.addEventListener('DOMContentLoaded', () => {
    // CSS background-image esetén
    setSVGBackgroundSize();

    // Inline SVG esetén
    adjustInlineSVG();

    // Dinamikus átméretezés beállítása
    setupDynamicSVGResize();
});

// Window resize esetén is frissítjük (fallback)
window.addEventListener('resize', () => {
    setSVGBackgroundSize();
    adjustInlineSVG();
});

// Exportáljuk a függvényeket, ha modulként használjuk
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setSVGBackgroundSize,
        adjustInlineSVG,
        setupDynamicSVGResize,
        createStretchedSVGBackground
    };
}
