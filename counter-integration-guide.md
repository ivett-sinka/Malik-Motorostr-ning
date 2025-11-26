# Számláló Integráció - Rólam Szekció

## 📋 Tartalom

Ez a megoldás beilleszti a számláló elemet a Rólam szekcióba úgy, hogy:
- **>1320px**: A számláló a bal oszlopban jelenik meg
- **≤1320px**: A számláló középre igazítva, az oszlopok alatt jelenik meg

## 📁 Fájlok

1. **`about-section-with-counter.html`** - Gutenberg HTML struktúra
2. **`counter.css`** - Számláló stílusok
3. **`counter.js`** - Animációs JavaScript
4. **`counter-integration-guide.md`** - Ez a dokumentáció

---

## 🚀 Telepítés - 3 Módszer

### **1. Módszer: Gutenberg Kód Blokk (Legegyszerűbb)**

Ha teljes kontrollt szeretnél a Gutenberg editorban:

1. **Gutenberg editorban**:
   - Töröld a jelenlegi oszlopokat
   - Add hozzá egy **"Egyéni HTML"** vagy **"Kód"** blokkot
   - Másold be az `about-section-with-counter.html` tartalmát

2. **CSS hozzáadása**:
   - Téma Customizer → Egyéni CSS
   - VAGY: `Megjelenés → Szerkesztés → style.css`
   - Másold be a `counter.css` tartalmát

3. **JavaScript hozzáadása**:
   - Hozz létre egy `counter.js` fájlt: `/wp-content/themes/YOUR_THEME/js/counter.js`
   - Másold be a `counter.js` tartalmát
   - Add hozzá a `functions.php`-hoz:

```php
function enqueue_counter_script() {
    wp_enqueue_script(
        'counter-animation',
        get_template_directory_uri() . '/js/counter.js',
        array(),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'enqueue_counter_script');
```

---

### **2. Módszer: PHP Sablon Módosítás**

Ha PHP sablonnal dolgozol:

1. **Sablon fájl módosítása** (pl. `template-parts/content-about.php`):

```php
<section class="for-me-section">
    <div class="about-columns-wrapper">
        <div class="my-column-left">
            <h2>Tapasztalat, ami számít</h2>
            <p>Málik László vagyok, 10 éve oktatok, több száz sikeres tanuló áll mögöttem.<br>
            Az évek során mindent kipróbáltam: enduro, krossz, több ezer kilométer túrázás a Balkánon és Nyugat-Európában, robogózás Délkelet-Ázsiában, és pályamotorozás is.</p>

            <div class="wp-block-buttons">
                <div class="wp-block-button secondary-button">
                    <a class="wp-block-button__link" href="#">Ismerj meg Jobban &gt;</a>
                </div>
            </div>

            <!-- Desktop számláló -->
            <div class="counter-wrapper desktop-counter">
                <?php get_template_part('template-parts/counter'); ?>
            </div>
        </div>

        <div class="my-column-right">
            <figure class="wp-block-image">
                <img src="<?php echo get_template_directory_uri(); ?>/images/MalikL01.jpg" alt="Málik László">
            </figure>
        </div>
    </div>

    <!-- Mobile számláló -->
    <div class="counter-wrapper mobile-counter">
        <?php get_template_part('template-parts/counter'); ?>
    </div>
</section>
```

2. **Számláló template létrehozása** (`template-parts/counter.php`):

```php
<div class="counter-container">
    <!-- Counter 1 -->
    <div class="counter-item">
        <div class="counter-number">
            <span class="counter-value" data-target="100">0</span>
            <span class="counter-suffix">+</span>
        </div>
        <div class="counter-label">Elégedett<br>résztvevő</div>
    </div>

    <!-- Counter 2 -->
    <div class="counter-item">
        <div class="counter-number">
            <span class="counter-value" data-target="10">0</span>
            <span class="counter-suffix"> év</span>
        </div>
        <div class="counter-label">Oktatói múlt</div>
    </div>

    <!-- Counter 3 -->
    <div class="counter-item">
        <div class="counter-number">
            <span class="counter-value" data-target="1000">0</span>
            <span class="counter-suffix">+</span>
        </div>
        <div class="counter-label">Óra motorozási<br>tapasztalat</div>
    </div>
</div>
```

---

### **3. Módszer: Gutenberg Blokkok Megtartása + Shortcode**

Ha szeretnéd megtartani a Gutenberg blokkokat:

1. **Shortcode hozzáadása a `functions.php`-hoz**:

```php
function malik_counter_shortcode() {
    ob_start();
    ?>
    <div class="counter-container">
        <!-- Counter 1 -->
        <div class="counter-item">
            <div class="counter-number">
                <span class="counter-value" data-target="100">0</span>
                <span class="counter-suffix">+</span>
            </div>
            <div class="counter-label">Elégedett<br>résztvevő</div>
        </div>

        <!-- Counter 2 -->
        <div class="counter-item">
            <div class="counter-number">
                <span class="counter-value" data-target="10">0</span>
                <span class="counter-suffix"> év</span>
            </div>
            <div class="counter-label">Oktatói múlt</div>
        </div>

        <!-- Counter 3 -->
        <div class="counter-item">
            <div class="counter-number">
                <span class="counter-value" data-target="1000">0</span>
                <span class="counter-suffix">+</span>
            </div>
            <div class="counter-label">Óra motorozási<br>tapasztalat</div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('malik_counter', 'malik_counter_shortcode');
```

2. **Gutenberg editorban**:
   - A `<p>"számláló"</p>` bekezdést cseréld le egy **Shortcode blokkra**
   - Add meg: `[malik_counter]`

---

## 🎨 CSS Testreszabás

### Breakpoint módosítása

Ha nem 1320px-nél szeretnéd a váltást:

```css
/* Cseréld le az 1320px-et pl. 1200px-re */
@media (max-width: 1200px) {
    .desktop-counter {
        display: none;
    }

    .mobile-counter {
        display: block;
    }
}
```

### Színek módosítása

```css
/* Számok színe */
.counter-number {
    color: #C9A961; /* Arany szín */
}

/* Címkék színe */
.counter-label {
    color: #FFF; /* Fehér */
}
```

### Betűméret módosítása

```css
/* Desktop számok */
.counter-number {
    font-size: 48px; /* Nagyobb/kisebb */
}

/* Címkék */
.counter-label {
    font-size: 18px;
}
```

---

## 📱 Működés

### Desktop (>1320px)
- Számláló a bal oszlopban jelenik meg
- A gombok alatt, balra igazítva
- Három számláló egymás mellett

### Tablet/Mobile (≤1320px)
- Számláló az oszlopok alatt
- Középre igazítva
- Külön szekcióban jelenik meg

### Animáció
- Amikor a látómezőbe kerül, elkezd számolni 0-tól
- 2 másodperc alatt éri el a végértéket
- Csak egyszer játszódik le (nem ismétlődik görgetéskor)

---

## 🔧 Testreszabási lehetőségek

### Számláló értékek módosítása

A `data-target` attribútumban állítsd be a kívánt végértéket:

```html
<span class="counter-value" data-target="500">0</span>
```

### Animáció sebessége

A `counter.js` fájlban:

```javascript
const duration = 2000; // 2 másodperc (változtasd meg!)
```

### Több/kevesebb számláló

Másolj be több `.counter-item` div-et, vagy törölj belőle.

---

## ✅ Ellenőrző lista

- [ ] HTML beillesztve Gutenberg-be vagy PHP sablonba
- [ ] CSS hozzáadva a témához
- [ ] JavaScript fájl létrehozva és betöltve
- [ ] `functions.php` módosítva (script enqueue)
- [ ] Tesztelve desktop nézetben (>1320px)
- [ ] Tesztelve tablet/mobile nézetben (<1320px)
- [ ] Animáció működik görgetéskor

---

## 🐛 Hibakeresés

### Számláló nem jelenik meg
1. Ellenőrizd, hogy a CSS betöltődött-e
2. Nézd meg a böngésző konzolban, hogy van-e JS hiba

### Animáció nem indul el
1. Ellenőrizd, hogy a `counter.js` betöltődött-e
2. Nézd meg, hogy a `.counter-value` elemek megvannak-e

### Nem responsive
1. Ellenőrizd a CSS media query-ket
2. Teszteld különböző képernyőméreteken

---

## 📞 Támogatás

Ha bármi kérdés van, nézd meg a példa fájlokat:
- `about-section-with-counter.html` - Teljes HTML struktúra
- `counter.css` - Teljes CSS
- `counter.js` - Teljes JavaScript

Minden kommentezve és részletesen dokumentálva! 🚀
