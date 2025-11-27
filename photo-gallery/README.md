# 📸 Pillanatok a tréningekről - Fotó Galéria

Professzionális galéria komponens végtelen scroll funkcióval, lightbox nézegetővel és teljes drag/touch támogatással.

---

## ✨ Funkciók

### 🎬 Infinite Auto-Scroll
- ✅ Képek folyamatosan, lassan futnak jobbról balra
- ✅ Végtelenített animáció (seamless loop)
- ✅ Szünetel hover-re és kézi húzásra
- ✅ Automatikusan folytatódik interakció után

### 🖱️ Drag & Touch Támogatás
- ✅ Egérrel húzható jobbra-balra
- ✅ Érintőképernyőn ujjal tologatható
- ✅ Smooth animáció draggolás közben
- ✅ Auto-scroll folytatódik húzás után

### 🔍 Lightbox Képnézegető
- ✅ Fekete-fehér hover effekt
- ✅ "+" gomb (fehér 50% opacity, blur, fekete szimbólum)
- ✅ Nagy méretű kép megnyitása
- ✅ Elsötétített háttér
- ✅ Animált X bezárógomb (forgás hover-re)
- ✅ Jobbra-balra nyilak navigációhoz
- ✅ Billentyűzet támogatás (ESC, ←, →)

### 📱 Responsive Design
- ✅ Desktop: 348 x 259px képek
- ✅ Tablet: 280 x 210px képek
- ✅ Mobil: 240 x 180px képek

---

## 📁 Fájl Struktúra

```
photo-gallery/
├── index.html              ← HTML struktúra
├── photo-gallery.css       ← Teljes stílus (infinite scroll + lightbox)
├── photo-gallery.js        ← Funkciók (drag, touch, lightbox)
├── README.md               ← Ez a fájl
└── images/                 ← Képek mappája
    ├── training-1.jpg
    ├── training-2.jpg
    ├── training-3.jpg
    ├── training-4.jpg
    ├── training-5.jpg
    └── training-6.jpg
```

---

## 🚀 Használat

### 1. Képek Hozzáadása

Másold a képeket az `images/` mappába:
- **Ajánlott méret:** 348 x 259px (fekvő tájolású)
- **Formátum:** JPG, PNG, WEBP
- **Fájlnevek:** `training-1.jpg`, `training-2.jpg`, stb.

### 2. HTML Módosítása (ha több képet akarsz)

Ha több mint 6 képet akarsz, add hozzá az `index.html`-ben:

```html
<div class="gallery-item" data-index="6">
    <img src="images/training-7.jpg" alt="Tréning pillanat 7">
    <div class="gallery-overlay">
        <button class="gallery-zoom-btn" aria-label="Kép nagyítása">
            <span class="plus-icon">+</span>
        </button>
    </div>
</div>
```

**FONTOS:**
1. Duplikáld ugyanazokat a képeket a seamless loop-hoz (lásd HTML-ben)
2. Frissítsd a `photo-gallery.js` fájlban a `totalImages` értékét:

```javascript
const totalImages = 7; // Ha 7 egyedi képed van
```

### 3. WordPress Integráció

#### Módszer 1: Shortcode (Ajánlott)

Add hozzá a `functions.php`-hez:

```php
function malik_photo_gallery_shortcode() {
    ob_start();
    include(get_template_directory() . '/photo-gallery/index.html');
    return ob_get_clean();
}
add_shortcode('photo_gallery', 'malik_photo_gallery_shortcode');
```

Gutenbergben használd:
```
[photo_gallery]
```

#### Módszer 2: Template Part

```php
<?php include(get_template_directory() . '/photo-gallery/index.html'); ?>
```

#### CSS/JS Betöltés WordPress-ben

`functions.php`:
```php
function malik_enqueue_gallery_assets() {
    wp_enqueue_style(
        'photo-gallery',
        get_template_directory_uri() . '/photo-gallery/photo-gallery.css',
        array(),
        '1.0.0'
    );

    wp_enqueue_script(
        'photo-gallery',
        get_template_directory_uri() . '/photo-gallery/photo-gallery.js',
        array(),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'malik_enqueue_gallery_assets');
```

---

## ⚙️ Testreszabás

### Animáció Sebesség Módosítása

`photo-gallery.css` (34. sor):

```css
.slider-track {
    animation: slide 40s linear infinite; /* ← 40s = lassabb, 20s = gyorsabb */
}
```

### Kép Gap (Távolság) Módosítása

`photo-gallery.css` (33. sor):

```css
.slider-track {
    gap: 30px; /* ← Képek közötti távolság */
}
```

### Kép Méret Módosítása

`photo-gallery.css` (58-61. sor):

```css
.gallery-item {
    width: 348px;  /* Szélesség */
    height: 259px; /* Magasság */
}
```

### Főcím Módosítása

`index.html` (14. sor):

```html
<h2 class="gallery-heading">Pillanatok a tréningekről</h2>
```

### Hover Effekt Módosítása

Ha nem szeretnéd a fekete-fehér effektet, távolítsd el:

`photo-gallery.css` (75-78. sor):

```css
/* Töröld vagy kommentezd ki: */
.gallery-item:hover img {
    filter: grayscale(100%);
}
```

### "+" Gomb Stílus Módosítása

`photo-gallery.css` (97-100. sor):

```css
.gallery-zoom-btn {
    background-color: rgba(255, 255, 255, 0.5); /* Háttér átlátszóság */
    backdrop-filter: blur(10px); /* Blur mértéke */
}
```

---

## 🎨 Színséma Módosítása

### Lightbox Háttér

`photo-gallery.css` (171. sor):

```css
.lightbox-backdrop {
    background-color: rgba(0, 0, 0, 0.9); /* 0.9 = 90% fekete */
}
```

### Navigációs Gombok

`photo-gallery.css` (218-222. sor):

```css
.lightbox-nav {
    background-color: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.3);
}
```

---

## 🐛 Hibaelhárítás

### Probléma 1: Képek nem jelennek meg

**Megoldás:**
1. Ellenőrizd, hogy a képek az `images/` mappában vannak
2. Ellenőrizd a fájlnevek helyességét: `training-1.jpg`, nem `Training-1.jpg`
3. Ellenőrizd a képútvonalat: `src="images/training-1.jpg"`

### Probléma 2: Infinite scroll nem működik

**Megoldás:**
1. Ellenőrizd, hogy a képek duplikálva vannak (lásd HTML)
2. CSS animáció ellenőrzése: `animation: slide 40s linear infinite;`
3. Browser cache törlése (Ctrl+Shift+R)

### Probléma 3: Lightbox nem nyílik meg

**Megoldás:**
1. Ellenőrizd a JavaScript betöltését (F12 Console)
2. Ellenőrizd: `photo-gallery.js` helyesen be van linkve
3. Konzolban kerress hibákat

### Probléma 4: Drag nem működik mobilon

**Megoldás:**
1. Ellenőrizd, hogy `{ passive: true }` be van állítva a touch event listenerekben
2. `touch-action: pan-x;` CSS hozzáadása a `.slider-wrapper`-hez:

```css
.slider-wrapper {
    touch-action: pan-x;
}
```

### Probléma 5: Animáció nem szünetel hover-re

**Megoldás:**
Ellenőrizd a CSS-ben:

```css
.slider-track:hover {
    animation-play-state: paused;
}
```

---

## ⌨️ Billentyűzet Vezérlés (Lightbox)

| Billentyű | Funkció |
|-----------|---------|
| **ESC** | Lightbox bezárása |
| **→** (jobbra nyíl) | Következő kép |
| **←** (balra nyíl) | Előző kép |

---

## 📱 Tesztelési Checklist

- [ ] Desktop (>768px): 348x259px képek láthatók
- [ ] Tablet (≤768px): 280x210px képek láthatók
- [ ] Mobil (≤480px): 240x180px képek láthatók
- [ ] Infinite scroll jobbról balra működik
- [ ] Hover: Képek fekete-fehérré válnak
- [ ] Hover: "+" gomb megjelenik
- [ ] Klikk: Lightbox megnyílik
- [ ] Lightbox: Háttér elsötétül
- [ ] Lightbox: X gomb forog hover-re és bezár
- [ ] Lightbox: Jobbra/balra nyilak működnek
- [ ] Lightbox: ESC billentyű bezárja
- [ ] Lightbox: Háttérre kattintás bezárja
- [ ] Drag: Egérrel húzható a slider
- [ ] Touch: Ujjal tologatható mobilon
- [ ] Animáció szünetel draggoláskor
- [ ] Animáció folytatódik draggolás után
- [ ] Console-ban nincs hiba

---

## 🎯 Teljesítmény Optimalizálás

### Kép Optimalizálás

1. **WebP formátum használata:**
   ```html
   <picture>
       <source srcset="images/training-1.webp" type="image/webp">
       <img src="images/training-1.jpg" alt="...">
   </picture>
   ```

2. **Lazy Loading:**
   ```html
   <img loading="lazy" src="images/training-1.jpg" alt="...">
   ```

3. **Ajánlott képméret:**
   - Desktop: 348x259px @ 80% quality
   - Fájlméret: < 50KB per kép

---

## 📚 Technikai Részletek

### CSS Animáció

```css
@keyframes slide {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}
```

- **-50%:** Pont a duplikált képek kezdetéig megy
- **linear:** Egyenletes sebesség
- **infinite:** Végtelen ismétlés

### JavaScript Drag Logic

```javascript
currentTranslate = prevTranslate + currentPosition - startPos;
```

- **prevTranslate:** Előző pozíció
- **currentPosition:** Jelenlegi egér/touch pozíció
- **startPos:** Dragging kezdete

---

## 🔄 Verzió Történet

**v1.0.0** (2025-11-27)
- ✅ Infinite auto-scroll (right to left)
- ✅ Drag & touch support
- ✅ Lightbox with navigation
- ✅ Grayscale hover effect
- ✅ Responsive design
- ✅ Keyboard controls

---

## 📞 Támogatás

Ha problémád van vagy kérdésed:
1. Ellenőrizd a **Hibaelhárítás** szekciót
2. Nézd meg a böngésző Console-t (F12)
3. Ellenőrizd, hogy minden fájl betöltődött (Network tab)

---

## 📄 Licenc

Ez a komponens szabadon használható és módosítható a projektedben.

---

**Készítve:** 2025-11-27
**Állapot:** ✅ Production Ready
**Kompatibilitás:** Modern böngészők (Chrome, Firefox, Safari, Edge)
