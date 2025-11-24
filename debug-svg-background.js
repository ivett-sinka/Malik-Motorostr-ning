/**
 * Training Card SVG Background Debug Tool
 *
 * Használat:
 * 1. Nyisd meg a weboldalt: https://malikmotorosoktatas.hu/
 * 2. Nyisd meg a böngésző fejlesztői eszközeit (F12)
 * 3. Menj a Console fülre
 * 4. Másold be ezt a teljes scriptet és nyomj Enter-t
 */

(function() {
    console.log('🔍 Training Card SVG Background Debugger');
    console.log('==========================================\n');

    // 1. Training-type-section keresése
    const section = document.querySelector('.training-type-section');
    if (!section) {
        console.error('❌ Nem található .training-type-section elem!');
        return;
    }
    console.log('✅ .training-type-section megtalálva');

    // 2. Training-card elemek keresése
    const cards = document.querySelectorAll('.training-card');
    if (cards.length === 0) {
        console.error('❌ Nem található .training-card elem!');
        return;
    }
    console.log(`✅ ${cards.length} db .training-card elem megtalálva\n`);

    // 3. Minden kártya elemzése
    cards.forEach((card, index) => {
        console.log(`📋 CARD ${index + 1} ELEMZÉS`);
        console.log('─────────────────────────────────────');

        // Méret információk
        const rect = card.getBoundingClientRect();
        console.log('📐 Méret:');
        console.log(`  Width: ${rect.width}px`);
        console.log(`  Height: ${rect.height}px`);

        // Computed styles
        const computed = window.getComputedStyle(card);
        console.log('\n🎨 Computed Styles:');
        console.log(`  background-image: ${computed.backgroundImage}`);
        console.log(`  background-size: ${computed.backgroundSize}`);
        console.log(`  background-position: ${computed.backgroundPosition}`);
        console.log(`  background-repeat: ${computed.backgroundRepeat}`);
        console.log(`  background-origin: ${computed.backgroundOrigin}`);
        console.log(`  background-clip: ${computed.backgroundClip}`);

        // Inline styles
        console.log('\n📝 Inline Styles:');
        if (card.style.backgroundImage) {
            console.log(`  background-image: ${card.style.backgroundImage}`);
        } else {
            console.log('  background-image: (nincs inline style)');
        }
        if (card.style.backgroundSize) {
            console.log(`  background-size: ${card.style.backgroundSize}`);
        } else {
            console.log('  background-size: (nincs inline style)');
        }

        // CSS osztályok
        console.log('\n🏷️ CSS Osztályok:');
        console.log(`  ${Array.from(card.classList).join(', ')}`);

        // Probléma detektálás
        console.log('\n⚠️ Problémák:');
        const bgSize = computed.backgroundSize;

        if (bgSize === 'auto' || bgSize === 'auto auto') {
            console.log('  ❌ background-size értéke "auto" - nem 100% 100%');
            console.log('  🔧 Megoldás: Inline style-ban kell 100% 100% !important');
        } else if (bgSize.includes('px')) {
            console.log(`  ❌ background-size fix pixel érték: ${bgSize}`);
            console.log('  🔧 Megoldás: Változtasd 100% 100%-ra');
        } else if (bgSize === '100% 100%') {
            console.log('  ✅ background-size értéke helyes: 100% 100%');
        } else {
            console.log(`  ⚠️ background-size értéke: ${bgSize}`);
        }

        // SVG betöltés ellenőrzése
        if (computed.backgroundImage === 'none') {
            console.log('  ❌ Nincs background-image beállítva!');
        } else if (!computed.backgroundImage.includes('card-grey-bg.svg')) {
            console.log(`  ⚠️ Nem a várt SVG van beállítva: ${computed.backgroundImage}`);
        } else {
            console.log('  ✅ SVG background-image helyesen van beállítva');
        }

        console.log('\n─────────────────────────────────────\n');
    });

    // 4. CSS szabályok elemzése
    console.log('📚 CSS SZABÁLYOK ELEMZÉSE');
    console.log('─────────────────────────────────────');

    const styleSheets = document.styleSheets;
    let foundRules = [];

    try {
        for (let sheet of styleSheets) {
            try {
                const rules = sheet.cssRules || sheet.rules;
                for (let rule of rules) {
                    if (rule.selectorText && rule.selectorText.includes('training-card')) {
                        foundRules.push({
                            selector: rule.selectorText,
                            backgroundSize: rule.style.backgroundSize || '(nincs)',
                            sheet: sheet.href || 'inline'
                        });
                    }
                }
            } catch(e) {
                // CORS miatt nem minden CSS elérhető
            }
        }

        if (foundRules.length > 0) {
            console.log('Talált .training-card CSS szabályok:');
            foundRules.forEach(rule => {
                console.log(`\n  Selector: ${rule.selector}`);
                console.log(`  background-size: ${rule.backgroundSize}`);
                console.log(`  Fájl: ${rule.sheet}`);
            });
        } else {
            console.log('⚠️ Nem találtam .training-card CSS szabályokat (lehet CORS miatt)');
        }
    } catch(e) {
        console.log('⚠️ CSS szabályok elemzése sikertelen:', e.message);
    }

    console.log('\n─────────────────────────────────────\n');

    // 5. Gyors javítási lehetőség
    console.log('🔧 GYORS JAVÍTÁS (ideiglenesen tesztelhető)');
    console.log('─────────────────────────────────────');
    console.log('Futtatd ezt a parancsot a konzolon:');
    console.log('\n');
    console.log('document.querySelectorAll(".training-card").forEach(card => {');
    console.log('    card.style.backgroundSize = "100% 100%";');
    console.log('    card.style.setProperty("background-size", "100% 100%", "important");');
    console.log('});');
    console.log('\n');
    console.log('Ha ez működik, akkor tudni fogjuk, hogy CSS specificitás a probléma.');
    console.log('\n==========================================');

})();
