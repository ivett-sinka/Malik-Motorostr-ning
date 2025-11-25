# 🍔 Hamburger Menü Integrációs Útmutató

## ✅ Elkészült fájlok

A következő fájlokat hoztam létre a hamburger menü működéséhez:

```
hamburger-menu/
├── hamburger-menu.js           # JavaScript működés
├── hamburger-menu.css          # Teljes stíluslap
├── hamburger-menu.html         # Példa HTML struktúra
├── README.md                   # Részletes dokumentáció (angol)
└── INTEGRACIOS_UTMUTATO.md    # Ez a fájl (magyar)
```

---

## 🔍 Mit csináltam?

### 1. **Javítottam a CSS-t**
   - ❌ Az eredeti CSS SVG vonalakra volt írva
   - ✅ Átírtam, hogy **span elemekkel** működjön (mint a HTML-edben)
   - ✅ Hozzáadtam simább animációkat
   - ✅ Javítottam a reszponzivitást

### 2. **Megírtam a JavaScript-et**
   - ✅ Teljes menü működés (nyitás/zárás)
   - ✅ Hamburger animáció (3 vonal → X)
   - ✅ Overlay létrehozása és kezelése
   - ✅ ESC billentyű támogatás
   - ✅ Automatikus bezárás desktop nézetben
   - ✅ Menü elemek animációja

### 3. **Elkészítettem a dokumentációt**
   - ✅ Részletes README angol nyelven
   - ✅ Magyar integrációs útmutató
   - ✅ HTML példa fájl

---

## 🚀 Gyors telepítés (WordPress)

### 1. lépés: Másold be a fájlokat

Töltsd le a `hamburger-menu` mappát a GitHubról, majd:

```
wp-content/themes/[tema-neved]/
├── css/
│   └── hamburger-menu.css      ← Másold ide
├── js/
│   └── hamburger-menu.js       ← Másold ide
```

### 2. lépés: Töröld a régi hamburger CSS-t

A jelenlegi `style.css` fájlodból **töröld ki** az összes hamburger menü CSS-t:

```css
/* TÖRÖLD EZEKET: */
#hamburger { ... }
#hamburger span { ... }
.hamburger.animating .line1-left { ... }
@keyframes line1LeftToX { ... }
/* ...stb... */
```

**Miért?** Mert az új `hamburger-menu.css` fájl már tartalmazza mindet, frissítve!

### 3. lépés: Töltsd be a fájlokat

**Módszer A: `header.php`-ban (egyszerűbb)**

Add hozzá a `<head>` szekcióhoz:

```php
<!-- Hamburger Menu CSS -->
<link rel="stylesheet" href="<?php echo esc_url(get_template_directory_uri()); ?>/css/hamburger-menu.css">
```

Add hozzá a `</body>` tag elé:

```php
<!-- Hamburger Menu JS -->
<script src="<?php echo esc_url(get_template_directory_uri()); ?>/js/hamburger-menu.js"></script>
```

**Módszer B: `functions.php`-ban (WordPress standard)**

```php
function malik_hamburger_menu_scripts() {
    // CSS betöltése
    wp_enqueue_style(
        'hamburger-menu-css',
        get_template_directory_uri() . '/css/hamburger-menu.css',
        array(), // függőségek (nincs)
        '1.0.0', // verzió
        'all'    // media type
    );

    // JavaScript betöltése
    wp_enqueue_script(
        'hamburger-menu-js',
        get_template_directory_uri() . '/js/hamburger-menu.js',
        array(), // függőségek (pl. jQuery nincs)
        '1.0.0', // verzió
        true     // footer-be töltse
    );
}
add_action('wp_enqueue_scripts', 'malik_hamburger_menu_scripts');
```

### 4. lépés: HTML struktúra ellenőrzése

A jelenlegi `header.php` fájlod már **jó struktúrájú**! ✅

Csak győződj meg róla, hogy a hamburger gomb így néz ki:

```php
<div id="hamburger">
    <span></span>
    <span></span>
    <span></span>
</div>
```

**Fontos:** Nem `<button>`, nem `<svg>`, hanem `<div>` 3 `<span>`-nal!

### 5. lépés: CSS változók ellenőrzése

Győződj meg róla, hogy a `style.css` vagy más fő CSS fájlodban definiálva vannak:

```css
:root {
    --gold: #C9A961;        /* Arany szín */
    --body-txt: #e0e0e0;    /* Szöveg szín */
}
```

Ha nincsenek, add hozzá őket!

---

## 🎨 Testreszabás

### Színek megváltoztatása

**1. Hamburger vonalak színe:**

```css
#hamburger span {
    background-color: #FFFFFF;  /* Például fehér */
}
```

**2. Menü háttér színe:**

```css
#nav-menu {
    background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
}
```

**3. Hover szín:**

```css
#main-menu ul li a:hover {
    color: #FFD700;  /* Például sárga arany */
}
```

### Animáció sebességének változtatása

**Hamburger animáció:**

```css
#hamburger span {
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                    ↑
                    Változtasd (0.3s = gyorsabb, 0.6s = lassabb)
}
```

**Menü slide-in:**

```css
#nav-menu {
    transition: right 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                      ↑
                      Változtasd
}
```

### Breakpoint módosítása

Alapértelmezetten **1380px** alatt jelenik meg a hamburger menü.

Ha más értéket szeretnél (pl. **1024px**):

```css
/* Keresd meg ezt a sort a CSS-ben: */
@media only screen and (max-width: 1380px) {
    /* Változtasd erre: */
    @media only screen and (max-width: 1024px) {
}
```

---

## 🧪 Tesztelés

### Desktop (> 1380px)
1. Nyisd meg az oldalt széles böngésző ablakban
2. ✅ **Normál vízszintes menü** látható
3. ✅ **Hamburger rejtve** van
4. ✅ **Hover effektek** működnek

### Tablet (768px - 1380px)
1. Kicsinyítsd az ablakot vagy nyisd meg tableten
2. ✅ **Hamburger megjelenik** a jobb felső sarokban
3. ✅ **Kattintásra kinyílik** az oldalsó menü
4. ✅ **Animációk simák**

### Mobile (< 768px)
1. Nyisd meg mobilon vagy kicsi ablakban
2. ✅ **Hamburger kisebb méret**
3. ✅ **Menü teljes szélességű**
4. ✅ **Touch események** működnek
5. ✅ **ESC billentyűvel bezárható** (ha van fizikai billentyűzet)

### Funkciók tesztelése

1. **Kattints a hamburger gombra**
   - ✅ 3 vonal → X animáció
   - ✅ Menü jobbról becsúszik
   - ✅ Overlay megjelenik

2. **Kattints az overlay-re** (sötét háttér)
   - ✅ Menü bezárul
   - ✅ X → 3 vonal animáció

3. **Nyomj ESC-et** (billentyűzeten)
   - ✅ Menü bezárul

4. **Kattints egy menüpontra**
   - ✅ Átirányít az oldalra
   - ✅ Menü automatikusan bezárul

5. **Méretezd át az ablakot**
   - ✅ Desktop nézetben automatikusan bezárul a menü

---

## ❓ Gyakori problémák és megoldások

### Probléma 1: "A menü nem nyílik meg"

**Ellenőrzés:**
```javascript
// Nyisd meg a böngésző konzolját (F12 → Console)
// Látnod kell: "Hamburger menu initialized successfully!"
```

**Megoldás:**
1. Ellenőrizd, hogy a JavaScript fájl betöltődött-e (F12 → Network → hamburger-menu.js)
2. Nézd meg a konzolt, vannak-e hibák
3. Győződj meg róla, hogy a `<div id="hamburger">` ID pontos (nem class!)

### Probléma 2: "Az animáció szaggatott"

**Megoldás:**
```css
/* Add hozzá a CSS-hez: */
#hamburger,
#hamburger span,
#nav-menu {
    will-change: transform;
    backface-visibility: hidden;
}
```

### Probléma 3: "Desktop nézetben is hamburger látszik"

**Megoldás:**
```css
/* Alapértelmezett desktop állapot: */
#hamburger {
    display: none;  /* Ellenőrizd, hogy ez van alap esetben */
}

/* Csak mobilon jelenjen meg: */
@media only screen and (max-width: 1380px) {
    #hamburger {
        display: flex;
    }
}
```

### Probléma 4: "A menü elemek nem animálódnak"

**Megoldás:**

Ellenőrizd, hogy a menü struktúra jó:

```html
<div id="nav-menu">
    <div id="main-menu">
        <ul id="menu-main-menu">  ← Fontos az ID!
            <li><a href="/">Link</a></li>
        </ul>
    </div>
</div>
```

### Probléma 5: "A színek nem jók"

**Megoldás:**

Ellenőrizd a CSS változókat:

```css
:root {
    --gold: #C9A961;
    --body-txt: #e0e0e0;
}

/* Ha nem működnek, használj direkt színeket: */
#hamburger span {
    background-color: #C9A961 !important;
}
```

---

## 📋 Ellenőrző lista

Teljes telepítés előtt menj végig ezen a listán:

- [ ] Fájlok átmásolva a helyes mappákba
- [ ] Régi hamburger CSS törölve
- [ ] Új CSS és JS betöltve (header.php vagy functions.php)
- [ ] CSS változók definiálva (:root)
- [ ] HTML struktúra helyes (<div id="hamburger"> + 3 span)
- [ ] Böngésző konzolban nincs hiba
- [ ] Desktop nézetben normál menü látszik
- [ ] Mobile nézetben hamburger látszik
- [ ] Kattintásra megnyílik a menü
- [ ] Animációk simák
- [ ] ESC-el bezárható
- [ ] Overlay működik

---

## 🎯 Következő lépések

1. **Telepítsd** a fájlokat a fenti útmutató szerint
2. **Teszteld** minden eszközön (desktop, tablet, mobile)
3. **Testreszabd** a színeket és animációkat az igényeidnek megfelelően
4. **Jelentkezz**, ha bármilyen problémád van!

---

## 💡 További tippek

### Teljesítmény optimalizálás

```css
/* Jobb teljesítmény GPU gyorsítással: */
#hamburger span,
#nav-menu {
    transform: translate3d(0, 0, 0);
}
```

### Akadálymentesség

```html
<!-- Add hozzá aria attribútumokat: -->
<div id="hamburger"
     role="button"
     aria-label="Menü megnyitása"
     aria-expanded="false"
     tabindex="0">
    <span></span>
    <span></span>
    <span></span>
</div>
```

### Smooth scroll

```css
/* Ha a menü linkek oldalbeli szekcióra mutatnak: */
html {
    scroll-behavior: smooth;
}
```

---

## 📞 Segítség

Ha bármilyen kérdésed van:

1. Nézd meg a `README.md` fájlt (részletesebb angol dokumentáció)
2. Ellenőrizd a böngésző konzolt (F12)
3. Próbáld ki a példa `hamburger-menu.html` fájlt
4. Kérdezz bátran!

---

**Készítette:** Claude
**Verzió:** 1.0.0
**Utolsó frissítés:** 2025-11-25

**Sok sikert a telepítéshez! 🚀**
