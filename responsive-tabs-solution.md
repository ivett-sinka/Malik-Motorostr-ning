# Responsive Tabs Megoldás - WordPress Gutenberg

## 1. HTML módosítások

A `training-cards` div elé add be ezt a tab navigációt:

```html
<!-- Tab Navigation (csak 1140px alatt jelenik meg) -->
<div class="training-tabs-nav">
    <button class="tab-button active" data-tab="training">Tréning</button>
    <button class="tab-button" data-tab="vip-training">VIP tréning</button>
</div>
```

A két `wp-block-column training-card` div-hez add hozzá ezeket az attribútumokat:

**Első kártya (Alapfokú tréning):**
```html
<div class="wp-block-column training-card active" data-tab-content="training" ...>
```

**Második kártya (VIP tréning):**
```html
<div class="wp-block-column training-card" data-tab-content="vip-training" ...>
```

---

## 2. CSS Kód

Illeszd be ezt a CSS-t a meglévő CSS alá:

```css
/* ====================================
   RESPONSIVE TABS - 1140px alatt
   ==================================== */

/* Tab navigáció elrejtése nagyobb képernyőkön */
.training-tabs-nav {
    display: none;
    gap: 0;
    margin-bottom: 2rem;
    border-radius: 12px;
    overflow: hidden;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

/* Tab gombok */
.training-tabs-nav .tab-button {
    flex: 1;
    padding: 16px 24px;
    background-color: rgba(255, 255, 255, 0.3);
    border: none;
    color: var(--txt-p, #424242);
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
}

.training-tabs-nav .tab-button:hover {
    background-color: rgba(255, 255, 255, 0.5);
}

.training-tabs-nav .tab-button.active {
    background-color: rgba(255, 255, 255, 0.9);
    color: var(--brown, #8B4513);
}

.training-tabs-nav .tab-button.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: var(--brown, #8B4513);
}

/* 1140px alatt aktiválódik a tabs funkció */
@media (max-width: 1140px) {
    /* Tab navigáció megjelenítése */
    .training-tabs-nav {
        display: flex;
    }

    /* Kártyák konténere */
    .training-cards {
        position: relative;
        overflow: hidden;
        min-height: 600px;
    }

    /* Minden kártya pozicionálása */
    .training-cards .training-card {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        opacity: 0;
        transform: translateX(-100%);
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
    }

    /* Aktív kártya megjelenítése slide-in animációval */
    .training-cards .training-card.active {
        position: relative;
        opacity: 1;
        transform: translateX(0);
        pointer-events: auto;
    }

    /* Jobbról kilépő kártya animáció */
    .training-cards .training-card.slide-out {
        opacity: 0;
        transform: translateX(100%);
    }
}

/* Tablet és kisebb eszközökön */
@media (max-width: 768px) {
    .training-card {
        min-width: 100%;
        padding: 50px 30px;
    }

    .training-tabs-nav .tab-button {
        font-size: 16px;
        padding: 14px 20px;
    }

    .training-cards {
        min-height: 800px;
    }
}

/* Mobil eszközökön */
@media (max-width: 480px) {
    .training-card {
        padding: 40px 20px;
        min-width: 100%;
    }

    .training-tabs-nav {
        margin-bottom: 1.5rem;
    }

    .training-tabs-nav .tab-button {
        font-size: 14px;
        padding: 12px 16px;
    }

    .card-price {
        font-size: 24px;
    }
}

/* Animáció finomhangolás - smooth slide effect */
@keyframes slideInFromLeft {
    from {
        opacity: 0;
        transform: translateX(-100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideOutToRight {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(100%);
    }
}
```

---

## 3. JavaScript Kód

Add hozzá ezt a JavaScriptet (WordPress-ben a `functions.php`-ban vagy külön JS fájlban):

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Csak 1140px alatt működik
    function initTrainingTabs() {
        const tabButtons = document.querySelectorAll('.training-tabs-nav .tab-button');
        const tabContents = document.querySelectorAll('.training-cards .training-card');

        if (tabButtons.length === 0 || tabContents.length === 0) {
            return; // Nincs mit inicializálni
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
                        // Új tartalom becsúsztatása
                        setTimeout(() => {
                            content.classList.add('active');
                            content.classList.remove('slide-out');
                        }, 50);
                    } else {
                        // Régi tartalom kiúsztatása
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

    // Inicializálás
    initTrainingTabs();

    // Window resize kezelése (ha átméretezzük az ablakot)
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Tabs reset nagyobb képernyőn
            if (window.innerWidth > 1140) {
                const tabContents = document.querySelectorAll('.training-cards .training-card');
                tabContents.forEach(content => {
                    content.classList.remove('active', 'slide-out');
                    content.style.position = '';
                    content.style.opacity = '';
                    content.style.transform = '';
                });
            }
        }, 250);
    });
});
```

---

## 4. WordPress Integration (functions.php)

Ha WordPress témában dolgozol, add hozzá ezt a `functions.php`-hoz:

```php
<?php
// Egyedi JavaScript betöltése
function enqueue_training_tabs_script() {
    wp_enqueue_script(
        'training-tabs',
        get_template_directory_uri() . '/js/training-tabs.js',
        array(),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'enqueue_training_tabs_script');
?>
```

---

## Használat lépésről lépésre:

1. **HTML**: A Gutenberg editorban add hozzá a `training-tabs-nav` div-et a training-cards elé, és add hozzá a `data-tab-content` attribútumokat a kártyákhoz

2. **CSS**: Másold be a CSS kódot a témád `style.css` fájljába vagy egy egyedi CSS fájlba

3. **JavaScript**: Hozz létre egy `training-tabs.js` fájlt a témád `/js/` mappájában és másold bele a JS kódot

4. **PHP**: Add hozzá a script enqueue kódot a `functions.php`-hoz

---

## Működés:

- **1140px felett**: Normál két oszlopos elrendezés (jelenleg működő verzió)
- **1140px alatt**: Megjelenik a tab navigáció, és csak egy kártya látszik egyszerre
- **Kattintásra**: A kártya becsúszik balról jobbra smooth animációval
- **Reszponzív**: Mobilon és tableten is tökéletesen működik

## Testreszabási lehetőségek:

- **Breakpoint módosítása**: A `1140px` értéket cseréld le bármilyen más értékre
- **Animáció sebessége**: A `0.5s` értéket módosítsd a CSS-ben
- **Színek**: Változtasd meg a `.tab-button` és `.tab-button.active` színeit
- **Min-height**: A `.training-cards` `min-height` értékét állítsd be a tartalom alapján
