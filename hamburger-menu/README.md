# Hamburger Menu - WordPress Integráció

## 📋 Tartalomjegyzék
- [Áttekintés](#áttekintés)
- [Fájlok](#fájlok)
- [WordPress Telepítés](#wordpress-telepítés)
- [HTML Struktúra](#html-struktúra)
- [CSS Testreszabás](#css-testreszabás)
- [JavaScript Funkciók](#javascript-funkciók)
- [Hibaelhárítás](#hibaelhárítás)

---

## 🎯 Áttekintés

Ez a hamburger menü rendszer WordPress témákhoz készült, teljesen reszponzív és animált megoldást kínál. A menü automatikusan hamburger ikonná alakul 1380px szélesség alatt.

**Főbb funkciók:**
- ✨ Sima animációk (hamburger → X)
- 📱 Teljes reszponzivitás
- ⌨️ Billentyűzet támogatás (ESC bezárja)
- 🎨 Testreszabható színek és animációk
- ♿ Akadálymentesség támogatva

---

## 📁 Fájlok

```
hamburger-menu/
├── hamburger-menu.css      # Stílusok
├── hamburger-menu.js       # JavaScript működés
├── hamburger-menu.html     # Példa HTML
└── README.md              # Ez a fájl
```

---

## 🔧 WordPress Telepítés

### 1. lépés: Fájlok feltöltése

Töltsd fel a fájlokat a témád könyvtárába:

```
wp-content/themes/[tema-neve]/
├── css/
│   └── hamburger-menu.css
├── js/
│   └── hamburger-menu.js
```

### 2. lépés: CSS betöltése

A `header.php` vagy `functions.php` fájlban add hozzá:

**Módszer 1: Direkt hivatkozás (header.php)**
```php
<link rel="stylesheet" href="<?php echo esc_url(get_template_directory_uri()); ?>/css/hamburger-menu.css">
```

**Módszer 2: WordPress funkcióval (functions.php)**
```php
function malik_enqueue_scripts() {
    wp_enqueue_style(
        'hamburger-menu',
        get_template_directory_uri() . '/css/hamburger-menu.css',
        array(),
        '1.0.0'
    );

    wp_enqueue_script(
        'hamburger-menu',
        get_template_directory_uri() . '/js/hamburger-menu.js',
        array(),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'malik_enqueue_scripts');
```

### 3. lépés: HTML struktúra

Cseréld le a jelenlegi header navigációdat erre:

```php
<header id="nav-header">
    <div id="page-top" class="content-box">
        <nav id="main-menu">
            <!-- Logo -->
            <div id="logo">
                <a href="/">
                    <div id="emblem">
                        <svg><!-- SVG logó --></svg>
                    </div>
                </a>
            </div>

            <!-- Hamburger Button -->
            <div id="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <!-- Navigation Menu -->
            <div id="nav-menu">
                <div id="main-menu">
                    <?php wp_nav_menu(array(
                        'theme_location' => 'main-menu',
                        'container' => ''
                    )); ?>
                </div>

                <div id="bottom-head">
                    <?php dynamic_sidebar('Kapcsolati infok (Head)'); ?>
                </div>
            </div>
        </nav>
    </div>
</header>
```

### 4. lépés: CSS változók

Add hozzá a `style.css` vagy `variables.css` fájlodhoz:

```css
:root {
    --gold: #C9A961;
    --body-txt: #e0e0e0;
}
```

---

## 🎨 HTML Struktúra

### Teljes struktúra:

```html
<header id="nav-header">
    <div id="page-top" class="content-box">
        <nav id="main-menu">

            <!-- 1. LOGO -->
            <div id="logo">
                <a href="/">
                    <div id="emblem">
                        <!-- SVG logó -->
                    </div>
                </a>
            </div>

            <!-- 2. HAMBURGER GOMB -->
            <div id="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <!-- 3. NAVIGÁCIÓS MENÜ -->
            <div id="nav-menu">

                <!-- Fő menü -->
                <div id="main-menu">
                    <ul id="menu-main-menu">
                        <li><a href="/">Menüpont 1</a></li>
                        <li><a href="/page2">Menüpont 2</a></li>
                        <!-- További menüpontok -->
                    </ul>
                </div>

                <!-- Alsó info (telefon, email) -->
                <div id="bottom-head">
                    <ul>
                        <li><a href="tel:+36301234567">Telefon</a></li>
                        <li><a href="mailto:info@example.com">Email</a></li>
                    </ul>
                </div>

            </div>

        </nav>
    </div>
</header>
```

---

## 🎨 CSS Testreszabás

### Színek módosítása:

```css
:root {
    --gold: #C9A961;          /* Arany szín */
    --body-txt: #e0e0e0;      /* Szöveg szín */
}

/* Hamburger vonalak színe */
#hamburger span {
    background-color: var(--gold);
}

/* Menü háttér */
#nav-menu {
    background: linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%);
}
```

### Animáció sebessége:

```css
/* Hamburger animáció sebessége */
#hamburger span {
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Menü slide animáció */
#nav-menu {
    transition: right 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Breakpoint módosítása:

```css
/* Alapértelmezetten 1380px alatt jelenik meg a hamburger */
@media only screen and (max-width: 1380px) {
    /* Mobile stílusok */
}

/* Ha más breakpointot szeretnél (pl. 1024px): */
@media only screen and (max-width: 1024px) {
    /* Mobile stílusok */
}
```

---

## ⚙️ JavaScript Funkciók

### Főbb funkciók:

**1. toggleMenu()** - Menü nyitás/zárás

**2. openMenu()** - Menü megnyitása:
- Hozzáadja az aktív osztályokat
- Megjeleníti az overlay-t
- Letiltja a body scroll-t
- Animálja a menüelemeket

**3. closeMenu()** - Menü bezárása:
- Eltávolítja az aktív osztályokat
- Elrejti az overlay-t
- Visszaállítja a body scroll-t

**4. handleEscKey()** - ESC billentyűvel bezárás

**5. handleResize()** - Automatikus bezárás desktop nézetben

### Eseménykezelők:

```javascript
// Hamburger kattintás
hamburger.addEventListener('click', toggleMenu);

// Overlay kattintás
overlay.addEventListener('click', toggleMenu);

// ESC billentyű
document.addEventListener('keydown', handleEscKey);

// Ablak átméretezése
window.addEventListener('resize', handleResize);

// Menü link kattintás (opcionális)
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isOpen) toggleMenu();
    });
});
```

---

## 🐛 Hibaelhárítás

### Probléma: A menü nem nyílik meg

**Megoldás 1:** Ellenőrizd, hogy a JavaScript betöltődött-e
```javascript
console.log('Hamburger menu initialized successfully!');
```

**Megoldás 2:** Ellenőrizd az elem ID-kat
```html
<div id="hamburger">  ✅ Helyes
<div class="hamburger">  ❌ Rossz
```

### Probléma: Az animáció nem működik

**Megoldás:** Ellenőrizd a CSS változókat
```css
/* Biztosítsd, hogy definiálva vannak: */
:root {
    --gold: #C9A961;
    --body-txt: #e0e0e0;
}
```

### Probléma: A menü desktop nézetben is hamburger

**Megoldás:** Ellenőrizd a media query-ket
```css
/* 1380px felett legyen normál menü */
@media only screen and (max-width: 1380px) {
    #hamburger {
        display: flex;  /* Csak itt jelenjen meg */
    }
}
```

### Probléma: Túl gyors/lassú az animáció

**Megoldás:** Módosítsd az időzítést
```css
/* CSS-ben */
#hamburger span {
    transition: all 0.4s;  /* Módosítsd (pl. 0.3s vagy 0.6s) */
}

/* JavaScript-ben */
setTimeout(() => {
    isAnimating = false;
}, 800);  /* Módosítsd a CSS-hez igazítva */
```

---

## 📱 Tesztelés

### Desktop (>1380px)
- ✅ Normál vízszintes menü
- ✅ Hamburger rejtve
- ✅ Hover effektek működnek

### Tablet (768px - 1380px)
- ✅ Hamburger megjelenik
- ✅ Menü oldalsó panel
- ✅ Animációk simák

### Mobile (<768px)
- ✅ Hamburger kisebb
- ✅ Menü teljes szélesség
- ✅ Touch események működnek

---

## 🎯 Tippek

1. **Teljesítmény:** A CSS animációk gyorsabbak mint a JavaScript
2. **Akadálymentesség:** Használj megfelelő aria-label attribútumokat
3. **SEO:** A menü mindig látható a HTML-ben (csak CSS-sel rejtett)
4. **Tesztelés:** Próbáld ki különböző eszközökön

---

## 📞 Támogatás

Ha bármilyen problémád van, ellenőrizd:
1. ✅ Betöltődtek-e a fájlok (DevTools Network tab)
2. ✅ Vannak-e JavaScript hibák (Console)
3. ✅ Jók-e az elem ID-k
4. ✅ Definiálva vannak-e a CSS változók

---

## 📄 Licenc

Ezt a kódot szabadon használhatod és módosíthatod a projektedben.

---

**Készítette:** Claude
**Verzió:** 1.0.0
**Utolsó frissítés:** 2025-11-25
